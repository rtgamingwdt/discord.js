"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.ws = new WebSocketManager_1.default(this);
    }
    login(token) {
        this.token = token;
        this.ws.connect();
    }
    destroy() {
        this.ws.destroy();
    }
}
exports.default = Client;
