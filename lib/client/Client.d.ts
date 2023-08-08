import ChannelManager from "../manager/ChannelManager";
import GuildManager from "../manager/GuildManager";
import UserManager from "../manager/UserManager";
import ClientUser from "../structures/ClientUser";
import Guild from "../structures/Guild";
import TextChannel from "../structures/TextChannel";
import ClientOptions from "../utils/ClientOptions";
import BaseClient from "./BaseClient";
export default class Client extends BaseClient {
    user: ClientUser | null;
    channels: ChannelManager;
    guilds: GuildManager;
    users: UserManager;
    token: string | undefined;
    private ws;
    constructor(options: ClientOptions);
    login(token: string): void;
    destroy(): void;
    fetchGuild(guildId: string): Promise<Guild>;
    fetchChannel(channelId: string): Promise<TextChannel | null>;
}
