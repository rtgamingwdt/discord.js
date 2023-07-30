const User = require("./User");

module.exports = class ClientUser extends User {
  
  constructor(data) {
    super(data);
    this.patchData(data);
  }

  patchData(data) {
    if ("token" in data) this.client.token = data.token;
  }
};
