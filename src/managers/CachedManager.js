const Collection = require("../client/utils/Collection");

module.exports = class CachedManager {
  constructor(client, maxLength = 225) {
    this.client = client;
    this.cache = new Collection();
    this.cache.maxLength = maxLength;
  }
};