'use-strict';
const Message = require("../../structures/Message");

module.exports = (client, data) => {
  data.client = client;

  if (typeof data.guild_id === "string") {
    client.fetchGuild(data.guild_id).then((guild) => {
      if(typeof data.channel_id === "string") {
        client.fetchGuildChannel(data.channel_id).then((channel) => {
          client.guilds.cache.get(guild.id).channels.cache.set(channel.id, channel);
          data.channel = channel;
          client.emit("MessageCreate", new Message(data));
        })
      }
    });
  }
};
