const User = require('../models/user');

const checkError = (err) => {
  const validationErrorCode = 400;
  const notFoundErrorCode = 404;
  const defaultErrorCode = 500;
  if (err.name === 'ValidationError') {
    return validationErrorCode;
  }
  if (err.name === 'NotFoundError') {
    return notFoundErrorCode;
  }
  return defaultErrorCode;
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(checkError(err)).send({ message: err.message }));
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (!user) {
        const error = new Error('Not found');
        error.name = 'NotFoundError';
        throw error;
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(checkError(err)).send({ message: err.message }));
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Запрашиваемый пользователь не найден');
        error.name = 'ValidationError';
        throw error;
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(checkError(err)).send({ message: err.message }));
};
module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(checkError(err)).send({ message: err.message }));
};
module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(checkError(err)).send({ message: err.message }));
};
