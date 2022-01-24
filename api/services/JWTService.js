const jwt = require("jsonwebtoken");
const SECRET = "1234567";
module.exports = {
  issuer(payload, expiredIn) {
    return jwt.sign(payload, SECRET, { expiresIn: expiredIn });
  },
  verify(token) {
    return jwt.verify(token, SECRET);
  },
};
