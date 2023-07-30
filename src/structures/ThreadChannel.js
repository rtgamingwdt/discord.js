const Channel = require("./Channel");

module.exports = class ThreadChannel extends Channel {
  constructor(data) {
    super(data);
    this.patchData(data);
  }

  patchData(data) {
    this.lastMessageId = data.last_message_id ?? undefined;
    this.rateLimitPerUser = data.rate_limit_per_user ?? undefined;
    this.lastPinTimestamp = data.last_pin_timestamp ?? undefined;
    this.messageCount = data.message_count ?? undefined;
    this.memberCount = data.member_count ?? undefined;
    this.threadMetadata = data.thread_metadata ?? undefined;
    this.member = data.member ?? undefined;
    this.totalMessageSent = data.total_message_sent ?? undefined;
    this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user ?? undefined;
  }
};
