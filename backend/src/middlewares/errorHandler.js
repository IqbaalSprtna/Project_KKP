// src/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.log("Error caught by errorHandler:", err);

  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "invalidPassword":
      status = 400;
      message = "Password must be at least 6 characters long.";
      break;
    case "EmailAlreadyRegistered":
      status = 409;
      message = "Email is already registered.";
      break;
    case "InvalidCredentials":
      status = 401;
      message = "Invalid email or password.";
      break;
    case "Unauthorized":
      status = 401;
      message = "You are not authorized to perform this action.";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token.";
      break;
    case "Forbidden":
      status = 403;
      message = "You don't have access to this resource.";
      break;
    case "UserNotFound":
      status = 404;
      message = "User Not Found";
      break;
    case "InvalidUser":
      status = 401;
      message = "You can only access your own data.";
      break;
    case "AccountDeleted":
      status = 401;
      message = "Your account has been deleted.";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
