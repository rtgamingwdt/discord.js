import BaseChannel from "./BaseChannel";
export default class TextChannel extends BaseChannel {
    topic: string | undefined;
    lastMessageId: string | undefined;
    rateLimitPerUser: number | undefined;
    lastPinTimestamp: string | undefined;
    messageCount: number | undefined;
    defaultAutoArchiveDuration: number | undefined;
    permissions: string | undefined;
    constructor(data: any);
    send(content: string): Promise<void>;
}
