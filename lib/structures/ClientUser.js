"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class ClientUser extends User_1.default {
    constructor(data) {
        super(data);
        if ("token" in data)
            data.client.token = data.token;
    }
}
exports.default = ClientUser;
