var url = require("url");
var fs = require("fs");
var mime = require("mime");
var path = require("path");

function send404(res) {
  res.writeHead(404, {
    "Content-Type": "text/plain"
  });
  res.write("Error 404: resource not found");
  res.end();
}

function sendFile(res, filepath, fileContent) {
  res.writeHead(200, {
    "Content-Type": mime.lookup(path.basename(filepath))
  });
  res.end(fileContent);
}

exports.serveStatic = function(req, res) {
  var filepath = "./view" + url.parse(req.url).pathname;

  fs.exists(filepath, function(exists) {
    if (exists) {
      fs.readFile(filepath, function(err, data) {
        if (err) {
          send404(res);
          return;
        }

        sendFile(res, filepath, data);
      });

      return;
    }

    send404(res);
  });
};
