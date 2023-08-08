import Client from "../../client/Client";
import ClientUser from "../../structures/ClientUser";

export default (client: Client, data: any) => {
    data.user.client = client;
    client.user = new ClientUser(data.user);
    client.emit("Ready", client);
}