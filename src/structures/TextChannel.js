const Channel = require("./Channel");

module.exports = class TextChannel extends Channel {
  constructor(data) {
    super(data);
    this.patchData(data);
  }

  patchData(data) {
    this.topic = data.topic ?? undefined;
    this.lastMessageId = data.last_message_id ?? undefined;
    this.rateLimitPerUser = data.rate_limit_per_user ?? undefined;
    this.lastPinTimestamp = data.last_pin_timestamp ?? undefined;
    this.messageCount = data.message_count ?? undefined;
    this.defaultAutoArchiveDuration = data.default_auto_archive_duration ?? undefined;
    this.permissions = data.permissions ?? undefined;
  }

  async send(content) {
    fetch(`https://discord.com/api/v10/channels/${this.id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${this.client.options.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });
  }
};
