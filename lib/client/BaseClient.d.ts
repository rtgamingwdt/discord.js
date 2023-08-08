/// <reference types="node" />
import EventEmitter from "events";
import ClientOptions from "../utils/ClientOptions";
import ClientEvents from "../utils/ClientEvents";
/**
 * The base class for all clients.
 */
export default class BaseClient extends EventEmitter {
    options: ClientOptions;
    constructor(options: ClientOptions);
    destroy(): void;
    once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
}
