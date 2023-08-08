import ClientOptions from "../utils/ClientOptions";
import BaseClient from "./BaseClient";
export default class Client extends BaseClient {
    user: null;
    token: string | undefined;
    private ws;
    constructor(options: ClientOptions);
    login(token: string): void;
    destroy(): void;
}
