import Client from "../client/Client";

export default class BaseChannel {
    
    public client: Client;
    public id: string;
    public type: number;
    public guildId: string | undefined;
    public position: number | undefined;
    public permissionOverwrites: any[];
    public name: string | undefined;
    public nsfw: boolean;
    public parentId: string | undefined;
    public flags: number | undefined;

    constructor(data: any) {
        this.client = data.client;
        this.id = data.id;
        this.type = data.type;

        this.guildId = data.guild_id ?? undefined;
        this.position = data.position ?? undefined;
        this.permissionOverwrites = data.permission_overwrites ?? undefined;
        this.name = data.name ?? undefined;
        this.nsfw = !!data.nsfw;
        this.parentId = data.parent_id ?? undefined;
        this.flags = data.flags ?? undefined;

        this.client.channels.cache.set(this.id, this);
    }
}