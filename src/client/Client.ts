import ClientOptions from "../utils/ClientOptions";
import BaseClient from "./BaseClient";
import WebSocketManager from "./ws/WebSocketManager";

export default class Client extends BaseClient {

    public user: null;
    public token: string | undefined;
    private ws: WebSocketManager;

    constructor(options: ClientOptions) {
        options.cache ??= {};
        options.cache.channels ??= 225;
        options.cache.guilds ??= 225;
        options.cache.users ??= 225;

        super(options);

        this.user = null
        this.ws = new WebSocketManager(this);
    }

    public login(token: string) {
        this.token = token;
        this.ws.connect();
    }

    public destroy() {
        this.ws.destroy();
    }
}