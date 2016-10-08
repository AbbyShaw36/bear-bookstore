var querystring = require("querystring");
var url = require("url");
var logger = require("./logger").logger;

exports.getQuery = function(req, cb) {
  var method = req.method;
  var query = [];
  var data = "";

  if (method === "GET" || method === "DELETE") {
    query = querystring.parse(url.parse(req.url).query);
    cb(query);
    return;
  }

  if (method === "POST" || method === "PUT") {
    req.setEncoding("utf8");

    req.addListener("data", function(chuck) {
      data += chuck;
    });

    req.addListener("end", function() {
      query = querystring.parse(data);
      cb(query);
    });

    return;
  }

  logger.warn("[get query string error] - request method not allowed.");
};
