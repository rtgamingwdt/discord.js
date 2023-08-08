import { Client } from "../src/index";

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"], cache: { channels: 500 } });

client.once("Ready", () => {
    console.log(client.user?.username, "is online!");
});

client.on("MessageCreate", (message) => {
    if(message.author.bot) return;
    message.channel.send("Hello World!");
})

// Your bot token
client.login("BOT_TOKEN");