var pug = require("pug");

exports.getPage = function(cb) {
  var html = pug.renderFile("../tpls/admin/signin.pug");

  cb(html);
};
