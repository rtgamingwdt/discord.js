import Colors from "../config/Colors"

type RGB = [red: number, green: number, blue: number]

interface MessageEmbedFooter {
    text: string,
    icon_url?: string,
    proxy_icon_url?: string
}

interface MessageEmbedImage {
    url: string,
    proxy_url: string | undefined,
    height: number | undefined,
    width: number | undefined
}

interface MessageEmbedThumbnail {
    url: string,
    proxy_url: string | undefined,
    height: number | undefined,
    width: number | undefined
}

interface MessageEmbedVideo {
    url: string | undefined,
    proxy_url: string | undefined,
    height: number | undefined,
    width: number | undefined
}

interface MessageEmbedProvider {
    name: string | undefined,
    url: string | undefined
}

interface MessageEmbedAuthor {
    name: string,
    url: string | undefined,
    icon_url: string | undefined,
    proxy_icon_url: string | undefined
}

interface MessageEmbedField {
    name: string,
    value: string,
    inline?: boolean
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

    public data: MessageEmbedData = {
        title: undefined,
        type: undefined,
        description: undefined,
        url: undefined,
        timestamp: undefined,
        color: undefined,
        footer: undefined,
        image: undefined,
        thumbnail: undefined,
        video: undefined,
        provider: undefined,
        author: undefined,
        fields: undefined,
    }

    public setTitle(title: string) {
        this.data.title = title;
        return this;
    }

    public setDescription(description: string) {
        this.data.description = description;
        return this;
    }

    public setURL(url: string) {
        this.data.url = url;
        return this;
    }

    public setTimestamp(timestamp: number | Date) {
        this.data.timestamp = timestamp;
        return this;
    }

    public setColor(color: number | string | RGB) {
        if (typeof color === "number") this.data.color = color;
        else if (Array.isArray(color)) this.data.color = (color[0] << 16) + (color[1] << 8) + color[2];
        else if (Colors[color as keyof typeof Colors]) this.data.color = parseInt(Colors[color as keyof typeof Colors].replace(/^#/, ''), 16);
        else if (typeof color === "string") this.data.color = parseInt(color.replace(/^#/, ''), 16);
        return this;
    }

    public setFooter(footer: MessageEmbedFooter) {
        this.data.footer = footer;
        return this;
    }

    public setImage(url: string) {
        this.data.image = {
            url: url,
            proxy_url: undefined,
            height: undefined,
            width: undefined
        }
        return this;
    }

    public setThumbnail(url: string) {
        this.data.thumbnail = {
            url: url,
            proxy_url: undefined,
            height: undefined,
            width: undefined
        }
        return this;
    }

    public setVideo(url: string) {
        this.data.video = {
            url: url,
            proxy_url: undefined,
            height: undefined,
            width: undefined
        }
        return this;
    }

    public setProvider(provider: MessageEmbedProvider) {
        this.data.provider = provider;
        return this;
    }

    public setAuthor(author: MessageEmbedAuthor) {
        this.data.author = author;
        return this;
    }

    public setFields(fields: MessageEmbedField[]) {
        this.data.fields = fields
        return this;
    }

    public toJSON() {
        return { ...this.data }
    }
}