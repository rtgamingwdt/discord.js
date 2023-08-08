/// <reference types="node" />
import EventEmitter from "events";
import Client from "../Client";
/**
 * The WebSocket manager for this client.
 */
export default class WebSocketManager extends EventEmitter {
    private client;
    private gateway;
    private _ws;
    private heartbeatInterval;
    constructor(client: Client);
    /**
    * Connect websocket to server
    */
    connect(): Promise<void>;
    /**
    * Identify the bot user
    */
    private identify;
    private calculateIntentsBitmask;
    private getIntentBitPosition;
    /**
     * Send heartbeats to discord to keep the connection active
     */
    private sendHeartbeat;
    /**
     * Start sending heartbeats to discord every interval
     */
    private startHeartbeat;
    /**
     * Stop sending heartbeats to discord
     */
    private stopHeartbeat;
    /**
     * Reconnect to discord
     */
    private reconnect;
    destroy(): void;
}
