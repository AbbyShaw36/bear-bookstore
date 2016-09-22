var dao = require("../dao/session").dao;
var User = require("../model/user").User;

function dao_create() {
  var user = new User();

  user.setId(1);

  dao.create(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

function dao_get() {
  var user = new User();

  user.setSessionId("57e38f3bd5c6171ca0168c99");

  dao.get(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}


function dao_delete() {
  var user = new User();

  user.setSessionId("57e38f3bd5c6171ca0168c99");

  dao.delete(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}
