"use-strict";

const Collection = require("../utils/Collection");
const Guild = require("./Guild");
const Role = require("./Role");
const User = require("./User");

/**
 * Represents a message on Discord.
 */
module.exports = class Message {
  constructor(data) {
    this.client = data.client;
    this.id = data.id;
    this.channel = data.channel;
    this.channelId = data.channel_id;
    data.author.client = this.client;
    this.author = new User(data.author);
    this.content = data.content;
    this.timestamp = data.timestamp;
    this.tts = data.tts;
    this.mentionEveryone = data.mention_everyone;

    this.patchData(data);
  }

  /**
   * Populate all of the message fields in a more comfortable syntax
   * @param {any} data Message data
   */
  patchData(data) {
    this.guildId = data.guild_id ?? null;
    this.editedTimestamp = data.edited_timestamp ?? null;
    this.mentions = {
      users: new Collection(),
    };

    if (data.mentions.length > 0)
      data.mentions.forEach((mention) => {
        mention.client = this.client;
        this.mentions.users.set(mention.id, new User(mention));
      });

    if (data.guild_id) {
      if (!data.client.guilds.cache.has(data.guild_id)) {
        data.client.fetchGuild(data.guild_id).then((guild) => {
          guild.client = data.client;
          this.guild = new Guild(guild);
        });
      } else {
        const guild = data.client.guilds.cache.get(data.guild_id);
        guild.client = data.client;
        this.guild = new Guild(guild);
      }
    }
  }

  async reply(content) {
    fetch(`https://discord.com/api/v10/channels/${this.channelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${this.client.options.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_reference: {
          message_id: this.id,
        },
        content,
      }),
    });
  }
};
