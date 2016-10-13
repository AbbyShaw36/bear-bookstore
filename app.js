var http = require("http");
var url = require("url");
var config = require("./config");
var logger = require("./util/logger").logger;
var router = require("./router/router").router;

function handleRequest(req, res) {
  var pathname = url.parse(req.url).pathname;

  logger.trace("Request for " + pathname + " received.");
  router(req, res);
}

http.createServer(handleRequest).listen(global.config.port, function() {
  logger.trace("Server listening on port " + global.config.port + ".");
});
