var pug = require("pug");
var sessionDao = require("../dao/session").dao;

exports.signin = function(cb) {
  var html = pug.renderFile("view/tpls/admin/signin.pug");

  cb(null, html);
};

exports.index = function(cb) {
  var html = pug.renderFile("view/tpls/admin/index.pug");

  cb(null, html);
};
