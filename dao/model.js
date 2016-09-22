var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  userId: Number
});

mongoose.connect("mongodb://localhost/bookstore");

exports.Session = mongoose.model("Session", SessionSchema);
