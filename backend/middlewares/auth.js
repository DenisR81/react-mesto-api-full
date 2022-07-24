const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { checkToken } = require('../helpers/jwt');

module.exports.isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }
  let payload;

  try {
    payload = checkToken(token);
  } catch (err) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
