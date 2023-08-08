import Client from "../client/Client";

export default class User {

    public client: Client;
    public id: string;
    public username: string;
    public discriminator: string;
    public globalName: string | null;
    public avatar: string | null;
    public bot: boolean;
    public system: boolean;
    public mfaEnabled: boolean;
    public banner: string | undefined;
    public accentColor: number | undefined;
    public locale: string | null;
    public verified: boolean;
    public email: string | undefined;
    public flags: number | null;
    public premiumType: number | null;
    public publicFlags: number | null;
    public avatarDecoration: string | null;

    constructor(data: any) {
        this.client = data.client;
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;

        this.globalName = data.global_name ?? null;
        this.avatar = data.avatar ?? null;
        this.bot = !!data.bot;
        this.system = !!data.system;
        this.mfaEnabled = !!data.mfa_enabled;
        this.banner = data.banner ?? undefined;
        this.accentColor = data.accent_color ?? undefined;
        this.locale = data.locale ?? null;
        this.verified = !!data.verified;
        this.email = data.email ?? undefined;
        this.flags = data.flags ?? null;
        this.premiumType = data.premium_type ?? null;
        this.publicFlags = data.public_flags ?? null;
        this.avatarDecoration = data.avatar_decoration ?? null;

        this.client.users.cache.set(this.id, this);
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