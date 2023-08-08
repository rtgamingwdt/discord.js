export default class Collection extends Map {
    maxLength: number;
    constructor({ maxLength }: {
        maxLength: number;
    });
    set(key: any, value: any): this;
}
