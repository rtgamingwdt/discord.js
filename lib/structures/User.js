"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.globalName = (_a = data.global_name) !== null && _a !== void 0 ? _a : null;
        this.avatar = (_b = data.avatar) !== null && _b !== void 0 ? _b : null;
        this.bot = !!data.bot;
        this.system = !!data.system;
        this.mfaEnabled = !!data.mfa_enabled;
        this.banner = (_c = data.banner) !== null && _c !== void 0 ? _c : undefined;
        this.accentColor = (_d = data.accent_color) !== null && _d !== void 0 ? _d : undefined;
        this.locale = (_e = data.locale) !== null && _e !== void 0 ? _e : null;
        this.verified = !!data.verified;
        this.email = (_f = data.email) !== null && _f !== void 0 ? _f : undefined;
        this.flags = (_g = data.flags) !== null && _g !== void 0 ? _g : null;
        this.premiumType = (_h = data.premium_type) !== null && _h !== void 0 ? _h : null;
        this.publicFlags = (_j = data.public_flags) !== null && _j !== void 0 ? _j : null;
        this.avatarDecoration = (_k = data.avatar_decoration) !== null && _k !== void 0 ? _k : null;
    }
    get createdTimestamp() {
        const timestamp = (BigInt(this.id) >> BigInt(22)) + BigInt(1420070400000);
        return timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp.toString());
    }
    get hexAccentColor() {
        return typeof this.accentColor !== "number"
            ? this.accentColor
            : `#${this.accentColor.toString(16).padStart(6, "0")}`;
    }
    get tag() {
        return typeof this.username === "string"
            ? this.discriminator === "0"
                ? this.username
                : `${this.username}#${this.discriminator}`
            : null;
    }
}
exports.default = User;
