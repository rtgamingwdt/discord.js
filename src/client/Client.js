"use-strict";
const ChannelManager = require("../managers/ChannelManager");
const GuildManager = require("../managers/GuildManager");
const UserManager = require("../managers/UserManager");
const ClientUser = require("../structures/ClientUser");
const Guild = require("../structures/Guild");
const TextChannel = require("../structures/TextChannel");
const User = require("../structures/User");
const BaseClient = require("./BaseClient");
const WebSocketManager = require("./ws/WebSocketManager");

const DefaultCollectionLimits = {
  users: 225,
  channels: 225,
  guilds: 225,
};

/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @extends {BaseClient}
 */
module.exports = class Client extends BaseClient {
  /**
   * @param {ClientOptions} options Options for the client
   */
  constructor(options) {
    if (!options.collectionLimits)
      options.collectionLimits = DefaultCollectionLimits;
    super(options);
    /**
     * The user of the client
     * @type {ClientUser | null}
     */
    this.user = null;
    this.users = new UserManager(this);
    this.channels = new ChannelManager(this);
    this.guilds = new GuildManager(this);
    this.ws = new WebSocketManager(this);
  }

  /**
   * Logs the client in, establishing a WebSocket connection to Discord.
   * @param {string} token Token of the account to log in with
   */
  login(token) {
    this.options.token = token;
    this.ws.connect();
  }

  /**
   * Destroy the WebSocket connection to Discord and perform cleanup.
   */
  destroy() {
    this.ws.destroy();
  }

  async fetchUser(id) {
    const res = await fetch(`https://discord.com/api/v10/users/${id}`, {
      headers: {
        Authorization: `Bot ${this.options.token}`,
      },
    });
    const data = await res.json();
    const user = new User(data);
    return user;
  }

  async fetchGuild(id) {
    const res = await fetch(`https://discord.com/api/v10/guilds/${id}`, {
      headers: {
        Authorization: `Bot ${this.options.token}`,
      },
    });
    const data = await res.json();
    data.client = this;
    const guild = new Guild(data);
    return guild;
  }

  async fetchGuildChannel(id) {
    const res = await fetch(`https://discord.com/api/v10/channels/${id}`, {
      headers: {
        Authorization: `Bot ${this.options.token}`,
      },
    });
    const data = await res.json();
    data.client = this;

    switch (data.type) {
      case 0:
        const channel = new TextChannel(data);
        return channel;
      default:
        return null;
    }
  }
};
