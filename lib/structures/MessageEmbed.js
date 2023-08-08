"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Colors_1 = __importDefault(require("../config/Colors"));
class MessageEmbed {
    constructor() {
        this.data = {
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
        };
    }
    setTitle(title) {
        this.data.title = title;
        return this;
    }
    setDescription(description) {
        this.data.description = description;
        return this;
    }
    setURL(url) {
        this.data.url = url;
        return this;
    }
    setTimestamp(timestamp) {
        this.data.timestamp = timestamp;
        return this;
    }
    setColor(color) {
        if (typeof color === "number")
            this.data.color = color;
        else if (Array.isArray(color))
            this.data.color = (color[0] << 16) + (color[1] << 8) + color[2];
        else if (Colors_1.default[color])
            this.data.color = parseInt(Colors_1.default[color].replace(/^#/, ''), 16);
        else if (typeof color === "string")
            this.data.color = parseInt(color.replace(/^#/, ''), 16);
        return this;
    }
    setFooter(footer) {
        this.data.footer = footer;
        return this;
    }
    setImage(url) {
        this.data.image = {
            url: url,
            proxy_url: undefined,
            height: undefined,
            width: undefined
        };
        return this;
    }
    setThumbnail(url) {
        this.data.thumbnail = {
            url: url,
            proxy_url: undefined,
            height: undefined,
            width: undefined
        };
        return this;
    }
    setVideo(url) {
        this.data.video = {
            url: url,
            proxy_url: undefined,
            height: undefined,
            width: undefined
        };
        return this;
    }
    setProvider(provider) {
        this.data.provider = provider;
        return this;
    }
    setAuthor(author) {
        this.data.author = author;
        return this;
    }
    setFields(fields) {
        this.data.fields = fields;
        return this;
    }
    toJSON() {
        return Object.assign({}, this.data);
    }
}
exports.default = MessageEmbed;
