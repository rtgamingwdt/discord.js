"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseChannel {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f;
        this.client = data.client;
        this.id = data.id;
        this.type = data.type;
        this.guildId = (_a = data.guild_id) !== null && _a !== void 0 ? _a : undefined;
        this.position = (_b = data.position) !== null && _b !== void 0 ? _b : undefined;
        this.permissionOverwrites = (_c = data.permission_overwrites) !== null && _c !== void 0 ? _c : undefined;
        this.name = (_d = data.name) !== null && _d !== void 0 ? _d : undefined;
        this.nsfw = !!data.nsfw;
        this.parentId = (_e = data.parent_id) !== null && _e !== void 0 ? _e : undefined;
        this.flags = (_f = data.flags) !== null && _f !== void 0 ? _f : undefined;
        this.client.channels.cache.set(this.id, this);
    }
}
exports.default = BaseChannel;
