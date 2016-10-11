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

exports.usernameNotProvided = {
  type: "illegalArgument",
  description: "Username must provided"
};

exports.passwordNotProvided = {
  type: "illegalArgument",
  description: "Password must provided"
};

exports.bookNotExists = {
  type: "resourceNotFound",
  description: "Book not exists"
};

exports.bookIdNotProvided = {
  type: "illegalArgument",
  description: "Book id must provided"
};

exports.bookNameNotProvided = {
  type: "illegalArgument",
  description: "Book name must provided"
};

exports.bookPriceNotProvided = {
  type: "illegalArgument",
  description: "Book price must provided"
};

exports.bookStockNotProvided = {
  type: "illegalArgument",
  description: "Book stock must provided"
};

exports.typeIdNotProvided = {
  type: "illegalArgument",
  description: "Type id must provided"
};

exports.typeNameNotProvided = {
  type: "illegalArgument",
  description: "Type name must provided"
};

exports.typeNotExists = {
  type: "resourceNotFound",
  description: "Type not exists"
};

exports.authorNameNotProvided = {
  type: "illegalArgument",
  description: "Author name must provided"
};

exports.authorIdNotProvided = {
  type: "illegalArgument",
  description: "Author id must provided"
};

exports.authorNotExists = {
  type: "resourceNotFound",
  description: "Author not exists"
};

exports.orderCodeNotProvided = {
  type: "illegalArgument",
  description: "Order code must provided"
};

exports.orderStatusNotProvided = {
  type: "illegalArgument",
  description: "Order status must provided"
};

exports.orderNotExists = {
  type: "resourceNotFound",
  description: "Order not exists"
};
