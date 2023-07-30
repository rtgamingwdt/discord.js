const Channel = require("./Channel");

module.exports = class VoiceChannel extends Channel {
  constructor(data) {
    super(data);
    this.patchData(data);
  }

  patchData(data) {
    this.userLimit = data.user_limit ?? undefined;
    this.bitrate = data.bitrate ?? undefined;
    this.rtcRegion = data.rtc_region ?? undefined;
    this.videoQualityMode = data.video_quality_mode ?? undefined;
  }
};
