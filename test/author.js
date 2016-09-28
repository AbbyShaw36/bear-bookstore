var dao = require("../dao/author").dao;
var Author = require("../model/author").Author;

function dao_create() {
  var author = new Author();
  author.setName("aaa");

  dao.create(author, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

dao_create();
