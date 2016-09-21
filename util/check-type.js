var checkType = function(type) {
  var value = this;

  switch (type) {
    case "number":
      return isNumber(value);
    case "string":
      return isString(value);
  }
};

function isNumber(num) {
  if (typeof num === "Number" && !isNaN(num)) {
    return true;
  }

  return false;
};

function isString(str) {
  if (typeof str === "String") {
    return true;
  }

  return false;
}

exports.checkType = checkType;
