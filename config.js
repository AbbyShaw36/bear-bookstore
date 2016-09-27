var sha1 = require("sha1");

global.config = {
  host: "127.0.0.1",
  port: 8080,
  admin: {
    id: 0,
    name: "admin",
    password: sha1("123456")
  }
};
