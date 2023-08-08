import EventEmitter from "events";
import ClientOptions from "../utils/ClientOptions";
import ClientEvents from "../utils/ClientEvents";

/**
 * The base class for all clients.
 */
export default class BaseClient extends EventEmitter {

    constructor(public options: ClientOptions) {
        super({ captureRejections: true });

        if (typeof options !== "object" || options === null)
            throw new Error("Client options must be an object");
    }

    destroy() {
        this.emit("destroy");
        this.removeAllListeners();
    }

    once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this {
        return super.once(event, listener as (...args: any[]) => void); // Call the once method from EventEmitter
    }

    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this {
        return super.on(event, listener as (...args: any[]) => void); // Call the once method from EventEmitter
    }
};
