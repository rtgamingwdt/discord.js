const User = require("../structures/User");
const CachedManager = require("./CachedManager");

module.exports = class UserManager extends CachedManager {
  constructor(client) {
    super(client, client.options.collectionLimits.users);
  }
};
