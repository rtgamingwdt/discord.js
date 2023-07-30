"use-strict";
const EventEmitter = require("events");
const WebSocket = require("ws");
const OpCodes = require("../../config/OpCodes");
const GatewayIntents = require("../../gateway/GatewayIntents");
const ClientUser = require("../../structures/ClientUser");
const ReadyEventHandler = require("../../handlers/client/ReadyEventHandler");
const MessageCreateEventHandler = require("../../handlers/guild/MessageCreateEventHandler");

/**
 * The WebSocket manager for this client.
 * @extends {EventEmitter}
 */
module.exports = class WebSocketManager extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.gateway = null;
    this._ws = null;
  }

  /**
   * Connect websocket to server
   */
  async connect() {
    try {
      // Fetch the Discord Gateway URL
      const res = await fetch("https://discord.com/api/v10/gateway");
      const data = await res.json();
      this.gateway = data.url;

      // Create and open a WebSocket connection
      this._ws = new WebSocket(this.gateway);

      this._ws.on("open", () => {
        // Send the identify payload after connection
        this.identify();
      });

      this._ws.on("message", (data) => {
        const packet = JSON.parse(data);
        const { op, t, d } = packet;

        switch (op) {
          case OpCodes.HELLO:
            const { heartbeat_interval } = d;
            this.startHeartbeat(heartbeat_interval);
            break;
          case OpCodes.HEARTBEAT_ACK:
            break;
          case OpCodes.DISPATCH:
            switch (t) {
              case "READY":
                ReadyEventHandler(this.client, d);
                break;
              case "MESSAGE_CREATE":
                MessageCreateEventHandler(this.client, d);
                break;
            }
            break;
        }
      });

      this._ws.on("close", (code, reason) => {
        this.reconnect();
        switch (code) {
          case 4000:
            throw new Error(
              "Something went wrong - We're not sure what went wrong. Try reconnecting?"
            );
          case 4001:
            throw new Error(
              "Something went wrong - You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!"
            );
          case 4002:
            throw new Error(
              "Something went wrong - You sent an invalid payload to Discord. Don't do that!"
            );
          case 4003:
            throw new Error(
              "Something went wrong - You sent us a payload prior to identifying."
            );
          case 4004:
            throw new Error(
              "Something went wrong - The account token sent with your identify payload is incorrect."
            );
          case 4005:
            throw new Error(
              "Something went wrong - You sent more than one identify payload. Don't do that!"
            );
          case 4007:
            throw new Error(
              "Something went wrong - The sequence sent when resuming the session was invalid. Reconnect and start a new session."
            );
          case 4008:
            throw new Error(
              "Something went wrong - Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this."
            );
          case 4009:
            throw new Error(
              "Something went wrong - Your session timed out. Reconnect and start a new one."
            );
          case 4010:
            throw new Error(
              "Something went wrong - You sent us an invalid shard when identifying."
            );
          case 4011:
            throw new Error(
              "Something went wrong - The session would have handled too many guilds - you are required to shard your connection in order to connect."
            );
          case 4012:
            throw new Error(
              "Something went wrong - You sent an invalid version for the gateway."
            );
          case 4013:
            throw new Error(
              "Something went wrong - You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value."
            );
          case 4014:
            throw new Error(
              "Something went wrong - You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not approved for."
            );
        }
      });
    } catch (error) {
      console.error("Error connecting to Discord Gateway:", error);
      this.reconnect();
    }
  }

  /**
   * Identify the bot user
   */
  identify() {
    const payload = {
      op: 2,
      d: {
        token: this.client.options.token,
        intents:
          typeof this.client.options.intents !== "number"
            ? this.calculateIntentsBitmask(this.client.options.intents)
            : this.client.options.intents,
        properties: {
          $os: "linux",
          $browser: "discord.js",
          $device: "discord.js",
        },
      },
    };
    this._ws.send(JSON.stringify(payload));

    // Send the first heartbeat immediately after identify
    this.sendHeartbeat();
  }

  /**
   * Send heartbeats to discord to keep the connection active
   */
  sendHeartbeat() {
    this._ws.send(JSON.stringify({ op: 1, d: null }));
  }

  /**
   * Start sending heartbeats to discord every interval
   * @param {number} interval Discord heartbeat interval
   */
  startHeartbeat(interval) {
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, interval);
  }

  /**
   * Stop sending heartbeats to discord
   */
  stopHeartbeat() {
    clearInterval(this.heartbeatInterval);
  }

  /**
   * Reconnect the websocket to discord
   */
  reconnect() {
    this.stopHeartbeat();
    this._ws = null;
    setTimeout(() => this.connect(), 5000);
  }

  /**
   * Calculate what the intent bitmask should be based on the array of intents provided
   * @param {Intents[]} intents Array of intents
   * @returns {number} Intents bitmask
   */
  calculateIntentsBitmask(intents) {
    let bitmask = 0;
    intents.forEach((intent) => {
      bitmask |= this.getIntentBitPosition(intent);
    });
    return bitmask;
  }

  /**
   *
   * @param {string} intent
   * @returns {number} The intent bit for the provided intent
   */
  getIntentBitPosition(intent) {
    if (GatewayIntents[intent]) return GatewayIntents[intent];
    else if (Object.values(GatewayIntents).includes(intent)) return intent;
    else return 0;
  }

  /**
   * Destroy the WebSocket connection to Discord and perform cleanup.
   */
  destroy() {
    // Stop sending heartbeats
    this.stopHeartbeat();

    // Close the WebSocket connection
    if (this._ws && this._ws.readyState === WebSocket.OPEN) {
      this._ws.close();
    }

    // Remove listeners and clear the WebSocket instance
    this._ws.removeAllListeners();
    this._ws = null;

    // Emit a 'destroy' event if you want to notify listeners about the WebSocketManager being destroyed
    this.emit("destroy");
  }
};
