export default class User {
    id: string;
    username: string;
    discriminator: string;
    globalName: string | null;
    avatar: string | null;
    bot: boolean;
    system: boolean;
    mfaEnabled: boolean;
    banner: string | undefined;
    accentColor: number | undefined;
    locale: string | null;
    verified: boolean;
    email: string | undefined;
    flags: number | null;
    premiumType: number | null;
    publicFlags: number | null;
    avatarDecoration: string | null;
    constructor(data: any);
    get createdTimestamp(): bigint;
    get createdAt(): Date;
    get hexAccentColor(): string | undefined;
    get tag(): string | null;
}
