"use-strict";
const EventEmitter = require("events");

/**
 * The base class for all clients.
 * @extends {EventEmitter}
 */
module.exports = class BaseClient extends EventEmitter {
  constructor(options = {}) {
    super({ captureRejections: true });

    if (typeof options !== "object" || options === null)
      throw new Error("Client options must be an object");

    this.options = options;
  }

  destroy() {
    this.emit("destroy");
    this.removeAllListeners();
  }
};
