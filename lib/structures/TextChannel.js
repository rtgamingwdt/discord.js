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
const BaseChannel_1 = __importDefault(require("./BaseChannel"));
class TextChannel extends BaseChannel_1.default {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(data);
        this.topic = (_a = data.topic) !== null && _a !== void 0 ? _a : undefined;
        this.lastMessageId = (_b = data.last_message_id) !== null && _b !== void 0 ? _b : undefined;
        this.rateLimitPerUser = (_c = data.rate_limit_per_user) !== null && _c !== void 0 ? _c : undefined;
        this.lastPinTimestamp = (_d = data.last_pin_timestamp) !== null && _d !== void 0 ? _d : undefined;
        this.messageCount = (_e = data.message_count) !== null && _e !== void 0 ? _e : undefined;
        this.defaultAutoArchiveDuration = (_f = data.default_auto_archive_duration) !== null && _f !== void 0 ? _f : undefined;
        this.permissions = (_g = data.permissions) !== null && _g !== void 0 ? _g : undefined;
    }
    send(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`${Config_1.default.API_URL}/channels/${this.id}/messages`, {
                method: "POST",
                headers: {
                    Authorization: `Bot ${this.client.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: typeof options === "string" ? options : options.content,
                    embeds: typeof options === "string" ? [] : (_a = options.embeds) === null || _a === void 0 ? void 0 : _a.map((embed) => embed.toJSON())
                }),
            });
        });
    }
}
exports.default = TextChannel;
