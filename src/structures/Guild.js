"use-strict";

const ChannelManager = require("../managers/ChannelManager");

/**
 * Represents a message on Discord.
 */
module.exports = class Guild {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.channels = new ChannelManager(data.client);
    this.ownerId = data.owner_id;
    this.afkTimeout = data.afk_timeout;
    this.verificationLevel = data.verificationLevel;
    this.defaultMessageNotifications = data.default_message_notifications;
    this.explicitContentFilter = data.explicit_content_filter;
    this.roles = data.roles;
    this.emojis = data.emojis;
    this.features = data.features;
    this.mfaLevel = data.mfa_level;
    this.systemChannelFlags = data.system_channel_flags;
    this.premiumTier = data.premium_tier;
    this.preferredLocale = data.preferred_locale;
    this.nsfwLevel = data.nsfw_level;
    this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
    this.patchData(data);
    data.client.guilds.cache.set(this.id, this);
  }

  /**
   * Populate all of the guild fields in a more comfortable syntax
   * @param {any} data Guild data
   */
  patchData(data) {
    this.icon = data.icon ?? null;
    this.iconHash = data.icon_hash ?? undefined;
    this.splash = data.splash ?? null;
    this.discoverySplash = data.discovery_splash ?? null;
    this.owner = !!data.owner;
    this.permissions = data.permissions ?? undefined;
    this.region = data.region ?? undefined;
    this.afkChannelId = data.afk_channel_id ?? null;
    this.widgetEnabled = !!data.widget_enabled;
    this.applicationId = data.application_id ?? null;
    this.systemChannelId = data.system_channel_id ?? null;
    this.rulesChannelId = data.rules_channel_id ?? null;
    this.maxPresences = data.max_presences ?? undefined;
    this.maxMembers = data.max_members ?? undefined;
    this.vanityUrlCode = data.vanity_url_code ?? null;
    this.description = data.description ?? null;
    this.banner = data.banner ?? null;
    this.premiumSubscriptionCount = data.premium_subscription_count ?? undefined;
    this.publicUpdatesChannelId = data.public_updates_channel_id ?? null;
    this.maxVideoChannelUsers = data.max_video_channel_users ?? undefined;
    this.maxStageVideoChannelUsers = data.max_stage_video_channel_users ?? undefined;
    this.approximateMemberCount = data.approximate_member_count ?? undefined;
    this.approximatePresenceCount = data.approximate_presence_count ?? undefined;
    this.welcomeScreen = data.welcome_screen ?? undefined;
    this.stickers = data.stickers ?? undefined;
    this.safetyAlertsChannelId = data.safety_alerts_channel_id ?? null;
  }
};
