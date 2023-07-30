"use-strict";

const ClientUser = require("../../structures/ClientUser");

module.exports = (client, data) => {
  data = data.user;
  data.client = client;
  client.user = new ClientUser(data);
  client.emit("Ready", client);
};
