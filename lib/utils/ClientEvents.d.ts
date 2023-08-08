import Client from "../client/Client";
import Message from "../structures/Message";
export default interface ClientEvents {
    Ready: [client: Client] | [];
    MessageCreate: [message: Message];
}
