const Channel = require("./Channel");

module.exports = class DMChannel extends Channel {
  constructor(data) {
    super(data);
    this.patchData(data);
  }

  patchData(data) {
    this.recipients = data.recipients ?? undefined;
    this.icon = data.icon ?? undefined;
    this.ownerId = data.owner_id ?? undefined;
    this.applicationId = data.application_id ?? undefined;
    this.managed = data.managed ?? undefined;
    this.lastPinTimestamp = data.last_pin_timestamp ?? undefined;
    this.messageCount = data.message_count ?? undefined;
  }
};
