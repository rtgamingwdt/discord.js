import Client from "../client/Client";
export default interface ClientEvents {
    Ready: [client: Client];
}
