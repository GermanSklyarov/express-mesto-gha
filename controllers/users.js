const User = require('../models/user');
const { checkError } = require('../utils/functions');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Запрашиваемый пользователь не найден');
        error.name = 'NotFoundError';
        throw error;
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
