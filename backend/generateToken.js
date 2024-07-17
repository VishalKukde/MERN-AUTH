const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const JWT_SECRET = "vishalk";
  //Give some value to your JWT_SECRET.

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
