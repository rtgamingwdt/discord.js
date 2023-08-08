import Config from "../config/Config";
import BaseChannel from "./BaseChannel";
import MessageEmbed from "./MessageEmbed";

export default class TextChannel extends BaseChannel {
    public topic: string | undefined;
    public lastMessageId: string | undefined;
    public rateLimitPerUser: number | undefined;
    public lastPinTimestamp: string | undefined;
    public messageCount: number | undefined;
    public defaultAutoArchiveDuration: number | undefined;
    public permissions: string | undefined;

    constructor(data: any) {
        super(data);
        this.topic = data.topic ?? undefined;
        this.lastMessageId = data.last_message_id ?? undefined;
        this.rateLimitPerUser = data.rate_limit_per_user ?? undefined;
        this.lastPinTimestamp = data.last_pin_timestamp ?? undefined;
        this.messageCount = data.message_count ?? undefined;
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration ?? undefined;
        this.permissions = data.permissions ?? undefined;
    }

    public async send(options: string | { content: string, embeds?: MessageEmbed[] }) {
        fetch(`${Config.API_URL}/channels/${this.id}/messages`, {
            method: "POST",
            headers: {
                Authorization: `Bot ${this.client.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: typeof options === "string" ? options : options.content,
                embeds: typeof options === "string" ? [] : options.embeds?.map((embed) => embed.toJSON())
            }),
        });
    }
}