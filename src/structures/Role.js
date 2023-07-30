"use-strict";
/**
 * Represents a role on Discord.
 */
module.exports = class Role {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.hoist = data.hoist;
    this.position = data.position;
    this.permissions = data.permissions;
    this.managed = data.managed;
    this.mentionable = data.mentionable;
    this.flags = data.flags;
    this.patchData(data);
  }

  /**
   * Populate all of the role fields in a more comfortable syntax
   * @param {any} data Role data
   */
  patchData(data) {
    this.icon = data.icon ?? undefined;
    this.unicodeEmoji = data.unicode_emoji ?? undefined;
    this.tags = data.tags ?? undefined;
  }
};
