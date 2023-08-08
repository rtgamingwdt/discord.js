import Client from "../client/Client";
export default class BaseChannel {
    client: Client;
    id: string;
    type: number;
    guildId: string | undefined;
    position: number | undefined;
    permissionOverwrites: any[];
    name: string | undefined;
    nsfw: boolean;
    parentId: string | undefined;
    flags: number | undefined;
    constructor(data: any);
}
