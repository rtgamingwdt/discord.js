import Client from "../client/Client";
import CacheManager from "./CacheManager";

export default class UserManager extends CacheManager {
    
    constructor(client: Client) {
        super(client, client.options.cache?.users!);
    }
}