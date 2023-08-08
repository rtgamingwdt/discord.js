"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientUser_1 = __importDefault(require("../../structures/ClientUser"));
exports.default = (client, data) => {
    data.user.client = client;
    client.user = new ClientUser_1.default(data.user);
    client.emit("Ready", client);
};
