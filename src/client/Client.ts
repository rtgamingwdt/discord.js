import Config from "../config/Config";
import ChannelManager from "../manager/ChannelManager";
import GuildManager from "../manager/GuildManager";
import UserManager from "../manager/UserManager";
import ClientUser from "../structures/ClientUser";
import Guild from "../structures/Guild";
import TextChannel from "../structures/TextChannel";
import ClientOptions from "../utils/ClientOptions";
import BaseClient from "./BaseClient";
import WebSocketManager from "./ws/WebSocketManager";

export default class Client extends BaseClient {

    public user: ClientUser | null;
    public channels: ChannelManager;
    public guilds: GuildManager;
    public users: UserManager;
    public token: string | undefined;
    private ws: WebSocketManager;

    constructor(options: ClientOptions) {
        options.cache ??= {};
        options.cache.channels ??= 225;
        options.cache.guilds ??= 225;
        options.cache.users ??= 225;

        super(options);

        this.user = null
        this.channels = new ChannelManager(this);
        this.guilds = new GuildManager(this);
        this.users = new UserManager(this);
        this.ws = new WebSocketManager(this);
    }

    public login(token: string) {
        this.token = token;
        this.ws.connect();
    }

    public destroy() {
        this.ws.destroy();
    }

    public async fetchGuild(guildId: string) {
        const res = await fetch(`${Config.API_URL}/guilds/${guildId}`, {
            headers: {
                Authorization: `Bot ${this.token}`,
            },
        });

        const data = await res.json();
        data.client = this;
        const guild = new Guild(data);
        return guild;
    }

    public async fetchChannel(channelId: string) {
        const res = await fetch(`${Config.API_URL}/channels/${channelId}`, {
            headers: {
                Authorization: `Bot ${this.token}`,
            },
        });

        const data = await res.json();
        data.client = this;

        switch (data.type) {
            case 0:
                return new TextChannel(data);
            default:
                return null;
        }
    }
}