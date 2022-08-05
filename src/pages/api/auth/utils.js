const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { JWT_SECRET, BCRYPT_ROUNDS } = process.env;

const hashPassword = async (originalPassword) => {
  const salt = await bcrypt.genSalt(Number(BCRYPT_ROUNDS));

  return await bcrypt.hash(originalPassword, salt);
};

const comparePasswords = async (originalPassword, hashedPassword) => {
  return await bcrypt.compare(originalPassword, hashedPassword);
};

const tokenBuilder = (user) => {
  const payload = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    user_id: user.user_id,
  };

  const options = {
    expiresIn: "5d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = {
  hashPassword,
  comparePasswords,
  tokenBuilder,
};
