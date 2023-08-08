import Client from "../client/Client";
import Collection from "../utils/Collection";
export default class CacheManager {
    client: Client;
    cache: Collection;
    constructor(client: Client, maxLength: number);
}
