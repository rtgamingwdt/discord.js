"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../utils/Collection"));
class CacheManager {
    constructor(client, maxLength) {
        this.client = client;
        this.cache = new Collection_1.default({ maxLength: maxLength });
    }
}
exports.default = CacheManager;
