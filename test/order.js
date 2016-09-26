var OrderForm = require("../model/order").OrderForm;
var dao = require("../dao/order").dao;

function dao_create() {
  var orderForm = new OrderForm();

  orderForm.setUser(1);

  dao.create(orderForm, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

// dao_create();

function dao_delete() {
  var orderForm = new OrderForm();

  orderForm.setCode("6b354b12c7a64bd7847e2630274c5463");

  dao.delete(orderForm, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

// dao_delete();

function dao_update() {
  var orderForm = new OrderForm();

  orderForm.setCode("b8601da8a1fa441e99e41b8ab13443df");
  orderForm.setStatus("1");

  dao.update(orderForm, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

// dao_update();

function dao_get() {
  var orderForm = new OrderForm();

  orderForm.setCode("b8601da8a1fa441e99e41b8ab13443df");

  dao.get(orderForm, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

// dao_get();
