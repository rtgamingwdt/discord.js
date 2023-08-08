import Client from "../../client/Client";
import Message from "../../structures/Message";

export default (client: Client, data: any) => {
  data.client = client;

  if (typeof data.guild_id === "string") {
    client.fetchGuild(data.guild_id).then((guild) => {
      if (typeof data.channel_id === "string") {
        client.fetchChannel(data.channel_id).then((channel) => {
          client.guilds.cache.get(guild.id).channels.cache.set(channel?.id, channel);
          data.channel = channel;
          client.emit("MessageCreate", new Message(data));
        })
      }
    });
  }
}