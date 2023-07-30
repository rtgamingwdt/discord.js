'use-strict';

/**
 * Represents a channel on Discord.
 */
module.exports = class Channel {

    constructor(data) {
        this.client = data.client;
        this.id = data.id;
        this.type = data.type;
        this.patchData(data);
        data.client.channels.cache.set(this.id, this);
    }

    /**
   * Populate all of the channel fields in a more comfortable syntax
   * @param {any} data Channel data
   */
    patchData(data) {
        this.guildId = data.guild_id ?? undefined;
        this.position = data.position ?? undefined;
        this.permissionOverwrites = data.permission_overwrites ?? undefined;
        this.name = data.name ?? undefined;
        this.nsfw = !!data.nsfw;
        this.parentId = data.parent_id ?? undefined;
        this.flags = data.flags ?? undefined;
        
        // Forum Channels
        // this.availableTags = data.available_tags ?? undefined;
        // this.appliedTags = data.applied_tags ?? undefined;
        // this.defaultReactionEmoji = data.default_reaction_emoji ?? undefined;
        // this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user ?? undefined;
        // this.defaultSortOrder = data.default_sort_order ?? undefined;
        // this.defaultForumLayout = data.default_forum_layout ?? undefined;
    }
}