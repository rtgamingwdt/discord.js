import Client from "../client/Client";
import Collection from "../utils/Collection";

export default class CacheManager {

    public cache: Collection;

    constructor(public client: Client, maxLength: number) {
        this.cache = new Collection({ maxLength: maxLength });
    }
}