const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { checkToken } = require('../helpers/jwt');

module.exports.isAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  const token = auth.replace('Bearer ', '');
  let payload;

  try {
    payload = checkToken(token);
  } catch (err) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
