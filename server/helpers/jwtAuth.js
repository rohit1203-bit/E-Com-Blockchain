const jwt = require('jsonwebtoken')

const maxAge = 60 * 60;

const createToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: maxAge })
  return token;
}

module.exports = { createToken }