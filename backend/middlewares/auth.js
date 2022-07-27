const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret');
  } catch (err) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
