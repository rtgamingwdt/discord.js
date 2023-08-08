/// <reference types="node" />
import EventEmitter from "events";
import ClientOptions from "../utils/ClientOptions";
/**
 * The base class for all clients.
 */
export default class BaseClient extends EventEmitter {
    options: ClientOptions;
    constructor(options: ClientOptions);
    destroy(): void;
}
