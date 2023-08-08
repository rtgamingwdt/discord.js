import User from "./User";

export default class ClientUser extends User {

    constructor(data: any) {
        super(data);
        if ("token" in data) data.client.token = data.token;
    }
}