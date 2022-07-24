const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY = 'secret';

module.exports.generateToken = (payload) => jwt.sign({ _id: payload }, SECRET_KEY, { expiresIn: '7d' });
module.exports.checkToken = (token) => jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret');
