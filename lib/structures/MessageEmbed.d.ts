type RGB = [red: number, green: number, blue: number];
interface MessageEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
interface MessageEmbedImage {
    url: string;
    proxy_url: string | undefined;
    height: number | undefined;
    width: number | undefined;
}
interface MessageEmbedThumbnail {
    url: string;
    proxy_url: string | undefined;
    height: number | undefined;
    width: number | undefined;
}
interface MessageEmbedVideo {
    url: string | undefined;
    proxy_url: string | undefined;
    height: number | undefined;
    width: number | undefined;
}
interface MessageEmbedProvider {
    name: string | undefined;
    url: string | undefined;
}
interface MessageEmbedAuthor {
    name: string;
    url: string | undefined;
    icon_url: string | undefined;
    proxy_icon_url: string | undefined;
}
interface MessageEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
interface MessageEmbedData {
    title: string | undefined;
    type: number | undefined;
    description: string | undefined;
    url: string | undefined;
    timestamp: number | Date | undefined;
    color: number | undefined;
    footer: MessageEmbedFooter | undefined;
    image: MessageEmbedImage | undefined;
    thumbnail: MessageEmbedThumbnail | undefined;
    video: MessageEmbedVideo | undefined;
    provider: MessageEmbedProvider | undefined;
    author: MessageEmbedAuthor | undefined;
    fields: MessageEmbedField[] | undefined;
}
export default class MessageEmbed {
    data: MessageEmbedData;
    setTitle(title: string): this;
    setDescription(description: string): this;
    setURL(url: string): this;
    setTimestamp(timestamp: number | Date): this;
    setColor(color: number | string | RGB): this;
    setFooter(footer: MessageEmbedFooter): this;
    setImage(url: string): this;
    setThumbnail(url: string): this;
    setVideo(url: string): this;
    setProvider(provider: MessageEmbedProvider): this;
    setAuthor(author: MessageEmbedAuthor): this;
    setFields(fields: MessageEmbedField[]): this;
    toJSON(): {
        title: string | undefined;
        type: number | undefined;
        description: string | undefined;
        url: string | undefined;
        timestamp: number | Date | undefined;
        color: number | undefined;
        footer: MessageEmbedFooter | undefined;
        image: MessageEmbedImage | undefined;
        thumbnail: MessageEmbedThumbnail | undefined;
        video: MessageEmbedVideo | undefined;
        provider: MessageEmbedProvider | undefined;
        author: MessageEmbedAuthor | undefined;
        fields: MessageEmbedField[] | undefined;
    };
}
export {};
