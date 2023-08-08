"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CacheManager_1 = __importDefault(require("./CacheManager"));
class GuildManager extends CacheManager_1.default {
    constructor(client) {
        var _a;
        super(client, (_a = client.options.cache) === null || _a === void 0 ? void 0 : _a.guilds);
    }
}
exports.default = GuildManager;
