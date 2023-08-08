import EventEmitter from "events";
import GatewayConfig from "../../config/GatewayConfig";
import WebSocket from "ws";
import OpCodes from "../../config/OpCodes";
import GatewayIntents from "../../config/GatewayIntents";
import DiscordError from "../../utils/DiscordError";
import Client from "../Client";

/**
 * The WebSocket manager for this client.
 */
export default class WebSocketManager extends EventEmitter {

    private gateway: string | null;
    private _ws: WebSocket | null;
    private heartbeatInterval: NodeJS.Timer | undefined;

    constructor(private client: Client) {
        super();
        this.gateway = null;
        this._ws = null;
    }

    /**
    * Connect websocket to server
    */
    public async connect() {
        try {
            const res = await fetch(GatewayConfig.GATEWAY_URL);
            const data = await res.json();

            this.gateway = data.url;
            this._ws = new WebSocket(this.gateway!);

            this._ws.on("open", () => {
                // Send the identify payload after connection
                this.identify();
            });

            this._ws.on("message", (data) => {
                const packet = JSON.parse(data.toString());
                const { op, t, d } = packet;

                switch (op) {
                    case OpCodes.HELLO:
                        const { heartbeat_interval } = d;
                        this.startHeartbeat(heartbeat_interval);
                        break;
                    case OpCodes.DISPATCH:
                        switch (t) {
                            case "READY":
                                console.log("Hello World");
                                break;
                        }
                        break;
                }
            });

            this._ws.on("close", (code) => {
                this.reconnect();
                throw new DiscordError(code);
            });
        } catch (error) {
            console.error("Error connecting to Discord Gateway:", error);
            this.reconnect();
        }
    }

    /**
    * Identify the bot user
    */
    private identify() {
        const payload = {
            op: OpCodes.IDENTIFY,
            d: {
                token: this.client.token,
                intents: typeof this.client.options.intents !== "number"
                    ? this.calculateIntentsBitmask(this.client.options.intents)
                    : this.client.options.intents,
                properties: {
                    $os: "linux",
                    $browser: "@rtgamingwdt/discord.js",
                    $device: "@rtgamingwdt/discord.js"
                }
            },
        }

        this._ws?.send(JSON.stringify(payload));

        // Send the first heartbeat immediately after identify
        this.sendHeartbeat();
    }

    private calculateIntentsBitmask(intents: [keyof typeof GatewayIntents]) {
        let bitmask = 0;
        intents.forEach((intent) => {
            bitmask |= this.getIntentBitPosition(intent);
        });
        return bitmask;
    }

    private getIntentBitPosition(intent: keyof typeof GatewayIntents): number {
        if (GatewayIntents[intent] !== undefined) {
            return GatewayIntents[intent];
        } else if (Object.values(GatewayIntents).includes(intent as unknown as number)) {
            return intent as unknown as number;
        } else {
            return 0; // You might want to return a default value here
        }
    }

    /**
     * Send heartbeats to discord to keep the connection active
     */
    private sendHeartbeat() {
        this._ws?.send(JSON.stringify({ op: 1, d: null }));
    }

    /**
     * Start sending heartbeats to discord every interval
     */
    private startHeartbeat(interval: number) {
        this.heartbeatInterval = setInterval(() => {
            this.sendHeartbeat();
        }, interval);
    }

    /**
     * Stop sending heartbeats to discord
     */
    private stopHeartbeat() {
        clearInterval(this.heartbeatInterval);
    }

    /**
     * Reconnect to discord
     */
    private reconnect() {
        // Stop sending heartbeats
        this.stopHeartbeat();
        // Clear the WebSocket instance
        this._ws = null;
        // Reconnect to discord
        setTimeout(() => this.connect(), 5000);
    }

    public destroy() {
        // Stop sending heartbeats
        this.stopHeartbeat();

        // Close the WebSocket connection
        if (this._ws && this._ws.readyState === WebSocket.OPEN) {
            this._ws.close();
        }

        // Remove listeners and clear the WebSocket instance
        this._ws?.removeAllListeners();
        this._ws = null;

        // Emit a 'destroy' event if you want to notify listeners about the WebSocketManager being destroyed
        this.emit("destroy");
    }
}