const User = require("../structures/User");
const CachedManager = require("./CachedManager");

module.exports = class GuildManager extends CachedManager {
  constructor(client) {
    super(client, client.options.collectionLimits.guilds);
  }
};
