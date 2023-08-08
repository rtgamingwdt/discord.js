import EventEmitter from "events";
import ClientOptions from "../utils/ClientOptions";

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
};
