"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    constructor({ maxLength }) {
        super();
        this.maxLength = maxLength;
    }
    set(key, value) {
        // If the cache size exceeds the maximum length, evict the least recently used item
        if (this.size >= this.maxLength) {
            const lruKey = this.keys().next().value;
            this.delete(lruKey);
        }
        return super.set(key, value);
    }
}
exports.default = Collection;
