"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const GatewayConfig_1 = __importDefault(require("../../config/GatewayConfig"));
const ws_1 = __importDefault(require("ws"));
const OpCodes_1 = __importDefault(require("../../config/OpCodes"));
const GatewayIntents_1 = __importDefault(require("../../config/GatewayIntents"));
const DiscordError_1 = __importDefault(require("../../utils/DiscordError"));
/**
 * The WebSocket manager for this client.
 */
class WebSocketManager extends events_1.default {
    constructor(client) {
        super();
        this.client = client;
        this.gateway = null;
        this._ws = null;
    }
    /**
    * Connect websocket to server
    */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(GatewayConfig_1.default.GATEWAY_URL);
                const data = yield res.json();
                this.gateway = data.url;
                this._ws = new ws_1.default(this.gateway);
                this._ws.on("open", () => {
                    // Send the identify payload after connection
                    this.identify();
                });
                this._ws.on("message", (data) => {
                    const packet = JSON.parse(data.toString());
                    const { op, t, d } = packet;
                    switch (op) {
                        case OpCodes_1.default.HELLO:
                            const { heartbeat_interval } = d;
                            this.startHeartbeat(heartbeat_interval);
                            break;
                        case OpCodes_1.default.DISPATCH:
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
                    throw new DiscordError_1.default(code);
                });
            }
            catch (error) {
                console.error("Error connecting to Discord Gateway:", error);
                this.reconnect();
            }
        });
    }
    /**
    * Identify the bot user
    */
    identify() {
        var _a;
        const payload = {
            op: OpCodes_1.default.IDENTIFY,
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
        };
        (_a = this._ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(payload));
        // Send the first heartbeat immediately after identify
        this.sendHeartbeat();
    }
    calculateIntentsBitmask(intents) {
        let bitmask = 0;
        intents.forEach((intent) => {
            bitmask |= this.getIntentBitPosition(intent);
        });
        return bitmask;
    }
    getIntentBitPosition(intent) {
        if (GatewayIntents_1.default[intent] !== undefined) {
            return GatewayIntents_1.default[intent];
        }
        else if (Object.values(GatewayIntents_1.default).includes(intent)) {
            return intent;
        }
        else {
            return 0; // You might want to return a default value here
        }
    }
    /**
     * Send heartbeats to discord to keep the connection active
     */
    sendHeartbeat() {
        var _a;
        (_a = this._ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ op: 1, d: null }));
    }
    /**
     * Start sending heartbeats to discord every interval
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
     * Reconnect to discord
     */
    reconnect() {
        // Stop sending heartbeats
        this.stopHeartbeat();
        // Clear the WebSocket instance
        this._ws = null;
        // Reconnect to discord
        setTimeout(() => this.connect(), 5000);
    }
    destroy() {
        var _a;
        // Stop sending heartbeats
        this.stopHeartbeat();
        // Close the WebSocket connection
        if (this._ws && this._ws.readyState === ws_1.default.OPEN) {
            this._ws.close();
        }
        // Remove listeners and clear the WebSocket instance
        (_a = this._ws) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        this._ws = null;
        // Emit a 'destroy' event if you want to notify listeners about the WebSocketManager being destroyed
        this.emit("destroy");
    }
}
exports.default = WebSocketManager;
