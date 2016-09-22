var mysql = require("mysql");
var logger = require("../util/logger").logger;
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bookstore"
});

connection.connect(function(err) {
  if (err) {
    logger.warn("Connect mysql database error.");
    return;
  }

  logger.warn("Connect mysql database success.");
});

exports.connection = connection;
