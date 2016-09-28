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

exports.bookNameNotProvided = {
  type: "illegalArgument",
  description: "Book name must provided"
};

exports.bookPriceNotProvided = {
  type: "illegalArgument",
  description: "Book price must provided"
};
