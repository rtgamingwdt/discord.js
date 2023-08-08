"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
/**
 * The base class for all clients.
 */
class BaseClient extends events_1.default {
    constructor(options) {
        super({ captureRejections: true });
        this.options = options;
        if (typeof options !== "object" || options === null)
            throw new Error("Client options must be an object");
    }
    destroy() {
        this.emit("destroy");
        this.removeAllListeners();
    }
}
exports.default = BaseClient;
;
