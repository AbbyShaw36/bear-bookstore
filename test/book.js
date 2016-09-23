var Book = require("../model/book").Book;
var dao = require("../dao/book").dao;

function dao_create() {
  var book = new Book();

  book.setName("book1");
  book.setType([1, 2, 3]);
  book.setAuthor([1, 2]);
  book.setPrice(43);
  book.setStock(22);
  book.setDescription("test");

  dao.create(book, function(err, result) {
    console.log(err);
    console.log(result);
  });
}
