import { Client } from "../src/index";

const client = new Client({ intents: ["Guilds"], cache: { channels: 500 } });

client.once("ready", (client) => {
    console.log(client);
})

client.login("BOT_TOKEN");