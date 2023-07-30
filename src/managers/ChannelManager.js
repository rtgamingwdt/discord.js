const CachedManager = require("./CachedManager");

module.exports = class ChannelManager extends CachedManager {
  constructor(client) {
    super(client, client.options.collectionLimits.channels);
  }
};
