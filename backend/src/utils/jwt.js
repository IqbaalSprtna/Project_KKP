const jwt = require("jsonwebtoken");

const DEFAULT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const generateToken = (payload, expiresIn = DEFAULT_EXPIRES_IN) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
