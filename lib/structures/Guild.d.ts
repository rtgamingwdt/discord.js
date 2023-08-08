import Client from "../client/Client";
import ChannelManager from "../manager/ChannelManager";
export default class Guild {
    client: Client;
    id: string;
    name: string;
    channels: ChannelManager;
    ownerId: string;
    afkTimeout: number;
    verificationLevel: number;
    defaultMessageNotifications: number;
    explicitContentFilter: number;
    roles: any[];
    emojis: any[];
    features: string[];
    mfaLevel: number;
    systemChannelFlags: number;
    premiumTier: number;
    preferredLocale: string;
    nsfwLevel: number;
    premiumProgressBarEnabled: boolean;
    icon: string | null;
    iconHash: string | null;
    splash: string | null;
    discoverySplash: string | null;
    owner: boolean;
    permissions: string | undefined;
    region: string | undefined;
    afkChannelId: string | null;
    widgetEnabled: boolean;
    applicationId: string | null;
    systemChannelId: string | null;
    rulesChannelId: string | null;
    maxPresences: number | undefined;
    maxMembers: number | undefined;
    vanityUrlCode: string | null;
    description: string | null;
    banner: string | null;
    premiumSubscriptionCount: number | undefined;
    publicUpdatesChannelId: string | null;
    maxVideoChannelUsers: number | undefined;
    maxStageVideoChannelUsers: number | undefined;
    approximateMemberCount: number | undefined;
    approximatePresenceCount: number | undefined;
    welcomeScreen: any;
    stickers: any[];
    safetyAlertsChannelId: string | null;
    constructor(data: any);
    get createdTimestamp(): bigint;
    get createdAt(): Date;
}
