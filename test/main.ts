import { Client } from "../src/index";

const client = new Client({ intents: ["Guilds"], cache: { channels: 500 } });

client.once("Ready", (client) => {
    console.log(client.user?.username, "is online!");
})

// Your bot token
client.login("YOUR_TOKEN");