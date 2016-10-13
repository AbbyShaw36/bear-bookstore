var mongoose = require("mongoose");
var logger = require("../util/logger").logger;
var db = null;

var Schema = mongoose.Schema;
var SessionSchema = new Schema({
  userId: Number
});

mongoose.connect("mongodb://localhost/bookstore");

db = mongoose.connection;

db.on("error", function() {
  logger.error("Fail to connect mongodb");
});

db.on("open", function() {
  logger.trace("Success to connect mongodb");
});

exports.Session = mongoose.model("Session", SessionSchema);
