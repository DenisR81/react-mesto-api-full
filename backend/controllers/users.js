const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user || req.params.userId)
    .then((user) => {
      if (!user || (req.params.userId && (user._id.toString() !== req.params.userId))) {
        next(new ErrorNotFound('Пользователь не найден'));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные для создания пользователя'));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ErrorConflict('E-mail занят другим пользователем'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Пользователь не найден'));
      } else if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные для обновления информации о пользователе'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Пользователь не найден'));
      } else if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные для обновления аватарки пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorUnauthorized('Неверный e-mail или пароль'));
      }

      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        return next(new ErrorUnauthorized('Неверный e-mail или пароль'));
      }
      return generateToken(user._id);
    })
    .then((token) => {
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
