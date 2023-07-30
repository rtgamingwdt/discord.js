"use-strict";
/**
 * Represents a user on Discord.
 */
module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.patchData(data);
    data.client.users.cache.set(this.id, this);
  }

  /**
   * Populate all of the user fields in a more comfortable syntax
   * @param {any} data User data
   */
  patchData(data) {
    /**
     * The user's display name, if it is set. For bots, this is the application name
     * @type {?string}
     */
    this.globalName = data.global_name ?? null;
    /**
     * The user's avatar hash
     * @type {?string}
     */
    this.avatar = data.avatar ?? null;
    /**
     * Whether the user belongs to an OAuth2 application
     * @type {boolean}
     */
    this.bot = !!data.bot;
    /**
     * Whether the user is an Official Discord System user (part of the urgent message system)
     * @type {boolean}
     */
    this.system = !!data.system;
    /**
     * 	Whether the user has two factor enabled on their account
     * @type {?boolean}
     */
    this.mfaEnabled = !!data.mfa_enabled ?? null;
    /**
     * The user's banner hash
     * @type {string}
     */
    this.banner = data.banner ?? undefined;
    /**
     * The user's banner color encoded as an integer representation of hexadecimal color code
     * @type {number}
     */
    this.accentColor = data.accent_color ?? undefined;
    /**
     * The user's chosen language option
     * @type {?string}
     */
    this.locale = data.locale ?? null;
    /**
     * Whether the email on this account has been verified
     * @type {?boolean}
     */
    this.verified = data.verified ?? null;
    /**
     * The user's email
     * @type {string}
     */
    this.email = data.email ?? undefined;
    /**
     * The flags on a user's account
     * @type {?number}
     */
    this.flags = data.flags ?? null;
    /**
     * The type of Nitro subscription on a user's account
     * @type {?number}
     */
    this.premiumType = data.premium_type ?? null;
    /**
     * The public flags on a user's account
     * @type {?number}
     */
    this.publicFlags = data.public_flags ?? null;
    /**
     * The user's avatar decoration hash
     * @type {?string}
     */
    this.avatarDecoration = data.avatar_decoration ?? null;
  }

  /**
   * The timestamp the user was created at
   */
  get createdTimestamp() {
    const timestamp = (BigInt(data.id) >> BigInt(22)) + BigInt(1420070400000);
    return timestamp;
  }

  /**
   * The date the user was created at
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * The hex code version of a accent color
   */
  get hexAccentColor() {
    return typeof this.accentColor !== "number"
      ? this.accentColor
      : `#${this.accentColor.toString(16).padStart(6, "0")}`;
  }

  /**
   * The tag of this user
   */
  get tag() {
    return typeof this.username === "string"
      ? this.discriminator === "0"
        ? this.username
        : `${this.username}#${this.discriminator}`
      : null;
  }
};
