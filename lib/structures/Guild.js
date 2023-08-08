"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChannelManager_1 = __importDefault(require("../manager/ChannelManager"));
class Guild {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        this.client = data.client;
        this.id = data.id;
        this.name = data.name;
        this.channels = new ChannelManager_1.default(data.client);
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
        this.icon = (_a = data.icon) !== null && _a !== void 0 ? _a : null;
        this.iconHash = (_b = data.icon_hash) !== null && _b !== void 0 ? _b : undefined;
        this.splash = (_c = data.splash) !== null && _c !== void 0 ? _c : null;
        this.discoverySplash = (_d = data.discovery_splash) !== null && _d !== void 0 ? _d : null;
        this.owner = !!data.owner;
        this.permissions = (_e = data.permissions) !== null && _e !== void 0 ? _e : undefined;
        this.region = (_f = data.region) !== null && _f !== void 0 ? _f : undefined;
        this.afkChannelId = (_g = data.afk_channel_id) !== null && _g !== void 0 ? _g : null;
        this.widgetEnabled = !!data.widget_enabled;
        this.applicationId = (_h = data.application_id) !== null && _h !== void 0 ? _h : null;
        this.systemChannelId = (_j = data.system_channel_id) !== null && _j !== void 0 ? _j : null;
        this.rulesChannelId = (_k = data.rules_channel_id) !== null && _k !== void 0 ? _k : null;
        this.maxPresences = (_l = data.max_presences) !== null && _l !== void 0 ? _l : undefined;
        this.maxMembers = (_m = data.max_members) !== null && _m !== void 0 ? _m : undefined;
        this.vanityUrlCode = (_o = data.vanity_url_code) !== null && _o !== void 0 ? _o : null;
        this.description = (_p = data.description) !== null && _p !== void 0 ? _p : null;
        this.banner = (_q = data.banner) !== null && _q !== void 0 ? _q : null;
        this.premiumSubscriptionCount = (_r = data.premium_subscription_count) !== null && _r !== void 0 ? _r : undefined;
        this.publicUpdatesChannelId = (_s = data.public_updates_channel_id) !== null && _s !== void 0 ? _s : null;
        this.maxVideoChannelUsers = (_t = data.max_video_channel_users) !== null && _t !== void 0 ? _t : undefined;
        this.maxStageVideoChannelUsers = (_u = data.max_stage_video_channel_users) !== null && _u !== void 0 ? _u : undefined;
        this.approximateMemberCount = (_v = data.approximate_member_count) !== null && _v !== void 0 ? _v : undefined;
        this.approximatePresenceCount = (_w = data.approximate_presence_count) !== null && _w !== void 0 ? _w : undefined;
        this.welcomeScreen = (_x = data.welcome_screen) !== null && _x !== void 0 ? _x : undefined;
        this.stickers = (_y = data.stickers) !== null && _y !== void 0 ? _y : undefined;
        this.safetyAlertsChannelId = (_z = data.safety_alerts_channel_id) !== null && _z !== void 0 ? _z : null;
        this.client.guilds.cache.set(this.id, this);
    }
    get createdTimestamp() {
        const timestamp = (BigInt(this.id) >> BigInt(22)) + BigInt(1420070400000);
        return timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp.toString());
    }
}
exports.default = Guild;
