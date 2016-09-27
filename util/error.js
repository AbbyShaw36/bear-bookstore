exports.internalServerErr = {
  type: "internalServerError",
  description: "Internal server error"
};

exports.methodNotAllowed = {
  type: "methodNotAllowed",
  description: "Request method not allowed"
};

exports.unauthorized = {
  type: "unauthorized",
  description: "Request unauthorized"
};

exports.usernameAlreadyExists = {
  type: "duplicateEntry",
  description: "Username already exists"
};

exports.userNotExists = {
  type: "resourceNotFound",
  description: "User not exists"
};

exports.bookNotExists = {
  type: "resourceNotFound",
  description: "Book not exists"
};
