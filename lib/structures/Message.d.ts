import Client from "../client/Client";
import Collection from "../utils/Collection";
import Guild from "./Guild";
import TextChannel from "./TextChannel";
import User from "./User";
export default class Message {
    client: Client;
    id: string;
    channel: TextChannel;
    channelId: string;
    author: User;
    content: string;
    timestamp: string;
    tts: boolean;
    mentionEveryone: boolean;
    guildId: string | null;
    editedTimestamp: string | null;
    mentions: {
        users: Collection;
    };
    guild: Guild | null;
    constructor(data: any);
    reply(content: string): Promise<void>;
}
