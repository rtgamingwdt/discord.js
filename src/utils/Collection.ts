export default class Collection extends Map {

    public maxLength: number;
    
    constructor({ maxLength }: { maxLength: number }) {
        super();
        this.maxLength = maxLength;
    }

    set(key: any, value: any): this {
        // If the cache size exceeds the maximum length, evict the least recently used item
        if (this.size >= this.maxLength) {
            const lruKey = this.keys().next().value;
            this.delete(lruKey);
        }

        return super.set(key, value);
    }
}
