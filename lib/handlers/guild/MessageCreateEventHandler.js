"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../structures/Message"));
exports.default = (client, data) => {
    data.client = client;
    if (typeof data.guild_id === "string") {
        client.fetchGuild(data.guild_id).then((guild) => {
            if (typeof data.channel_id === "string") {
                client.fetchChannel(data.channel_id).then((channel) => {
                    client.guilds.cache.get(guild.id).channels.cache.set(channel === null || channel === void 0 ? void 0 : channel.id, channel);
                    data.channel = channel;
                    client.emit("MessageCreate", new Message_1.default(data));
                });
            }
        });
    }
};
