const { Client, GatewayIntents } = require("../src");
const dotenv = require("dotenv");

const client = new Client({
  intents: [GatewayIntents.Guilds, GatewayIntents.GuildMembers, GatewayIntents.GuildMessages, GatewayIntents.MessageContent],
});

dotenv.config();

client.login(process.env.TOKEN);

client.once("Ready", () => {
  console.log(client.user.tag, "is logged in!");
})

client.on("MessageCreate", (message) => {
  if(message.author.bot) return;
  if(message.content.startsWith("!test")) return message.reply("Hello World!");
})