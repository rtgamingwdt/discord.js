import Client from "../client/Client";
import Config from "../config/Config";
import Collection from "../utils/Collection";
import Guild from "./Guild";
import TextChannel from "./TextChannel";
import User from "./User";

export default class Message {

    public client: Client;
    public id: string;
    public channel: TextChannel;
    public channelId: string;
    public author: User;
    public content: string;
    public timestamp: string;
    public tts: boolean;
    public mentionEveryone: boolean;
    public guildId: string | null;
    public editedTimestamp: string | null;
    public mentions: { users: Collection; };
    public guild!: Guild | null;

    constructor(data: any) {
        this.client = data.client;
        this.id = data.id;
        this.channel = data.channel;
        this.channelId = data.channel_id;
        data.author.client = this.client;
        this.author = new User(data.author);
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.tts = data.tts;
        this.mentionEveryone = data.mention_everyone;

        this.guildId = data.guild_id ?? null;
        this.editedTimestamp = data.edited_timestamp ?? null;
        this.mentions = {
            users: new Collection({ maxLength: this.client.options.cache?.users! }),
        };

        if (data.mentions.length > 0)
            data.mentions.forEach((mention: any) => {
                mention.client = this.client;
                this.mentions.users.set(mention.id, new User(mention));
            });

        if (data.guild_id) {
            if (!this.client.guilds.cache.has(data.guild_id)) {
                this.client.fetchGuild(data.guild_id).then((guild) => {
                    guild.client = data.client;
                    this.guild = new Guild(guild);
                });
            } else {
                const guild = data.client.guilds.cache.get(data.guild_id);
                guild.client = data.client;
                this.guild = new Guild(guild);
            }
        } else this.guild = null;
    }

    public async reply(content: string) {
        fetch(`${Config.API_URL}/channels/${this.channelId}/messages`, {
            method: "POST",
            headers: {
                Authorization: `Bot ${this.client.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message_reference: {
                    message_id: this.id,
                },
                content,
            }),
        });
    }
}