const basicAuth = require("express-basic-auth");

module.exports = auth = basicAuth({
  users: {
    admin: "123",
    user: "456",
  },
});
