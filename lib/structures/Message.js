"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../config/Config"));
const Collection_1 = __importDefault(require("../utils/Collection"));
const Guild_1 = __importDefault(require("./Guild"));
const User_1 = __importDefault(require("./User"));
class Message {
    constructor(data) {
        var _a, _b, _c;
        this.client = data.client;
        this.id = data.id;
        this.channel = data.channel;
        this.channelId = data.channel_id;
        data.author.client = this.client;
        this.author = new User_1.default(data.author);
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.tts = data.tts;
        this.mentionEveryone = data.mention_everyone;
        this.guildId = (_a = data.guild_id) !== null && _a !== void 0 ? _a : null;
        this.editedTimestamp = (_b = data.edited_timestamp) !== null && _b !== void 0 ? _b : null;
        this.mentions = {
            users: new Collection_1.default({ maxLength: (_c = this.client.options.cache) === null || _c === void 0 ? void 0 : _c.users }),
        };
        if (data.mentions.length > 0)
            data.mentions.forEach((mention) => {
                mention.client = this.client;
                this.mentions.users.set(mention.id, new User_1.default(mention));
            });
        if (data.guild_id) {
            if (!this.client.guilds.cache.has(data.guild_id)) {
                this.client.fetchGuild(data.guild_id).then((guild) => {
                    guild.client = data.client;
                    this.guild = new Guild_1.default(guild);
                });
            }
            else {
                const guild = data.client.guilds.cache.get(data.guild_id);
                guild.client = data.client;
                this.guild = new Guild_1.default(guild);
            }
        }
        else
            this.guild = null;
    }
    reply(content) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`${Config_1.default.API_URL}/channels/${this.channelId}/messages`, {
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
        });
    }
}
exports.default = Message;
