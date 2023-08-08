import BaseChannel from "./BaseChannel";
import MessageEmbed from "./MessageEmbed";
export default class TextChannel extends BaseChannel {
    topic: string | undefined;
    lastMessageId: string | undefined;
    rateLimitPerUser: number | undefined;
    lastPinTimestamp: string | undefined;
    messageCount: number | undefined;
    defaultAutoArchiveDuration: number | undefined;
    permissions: string | undefined;
    constructor(data: any);
    send(options: string | {
        content: string;
        embeds?: MessageEmbed[];
    }): Promise<void>;
}
