import GatewayIntents from "../config/GatewayIntents";

export default interface ClientOptions {
    intents: any,
    cache?: {
        channels?: number,
        guilds?: number,
        users?: number
    }
}