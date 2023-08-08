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
const ChannelManager_1 = __importDefault(require("../manager/ChannelManager"));
const GuildManager_1 = __importDefault(require("../manager/GuildManager"));
const UserManager_1 = __importDefault(require("../manager/UserManager"));
const Guild_1 = __importDefault(require("../structures/Guild"));
const TextChannel_1 = __importDefault(require("../structures/TextChannel"));
const BaseClient_1 = __importDefault(require("./BaseClient"));
const WebSocketManager_1 = __importDefault(require("./ws/WebSocketManager"));
class Client extends BaseClient_1.default {
    constructor(options) {
        var _a, _b, _c, _d;
        var _e, _f, _g;
        (_a = options.cache) !== null && _a !== void 0 ? _a : (options.cache = {});
        (_b = (_e = options.cache).channels) !== null && _b !== void 0 ? _b : (_e.channels = 225);
        (_c = (_f = options.cache).guilds) !== null && _c !== void 0 ? _c : (_f.guilds = 225);
        (_d = (_g = options.cache).users) !== null && _d !== void 0 ? _d : (_g.users = 225);
        super(options);
        this.user = null;
        this.channels = new ChannelManager_1.default(this);
        this.guilds = new GuildManager_1.default(this);
        this.users = new UserManager_1.default(this);
        this.ws = new WebSocketManager_1.default(this);
    }
    login(token) {
        this.token = token;
        this.ws.connect();
    }
    destroy() {
        this.ws.destroy();
    }
    fetchGuild(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${Config_1.default.API_URL}/guilds/${guildId}`, {
                headers: {
                    Authorization: `Bot ${this.token}`,
                },
            });
            const data = yield res.json();
            data.client = this;
            const guild = new Guild_1.default(data);
            return guild;
        });
    }
    fetchChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${Config_1.default.API_URL}/channels/${channelId}`, {
                headers: {
                    Authorization: `Bot ${this.token}`,
                },
            });
            const data = yield res.json();
            data.client = this;
            switch (data.type) {
                case 0:
                    return new TextChannel_1.default(data);
                default:
                    return null;
            }
        });
    }
}
exports.default = Client;
