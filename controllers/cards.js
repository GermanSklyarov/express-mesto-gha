const Card = require('../models/card');
const { checkError } = require('../utils/functions');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        const error = new Error('Not found');
        error.name = 'NotFoundError';
        throw error;
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Not found');
        error.name = 'NotFoundError';
        throw error;
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Not found');
        error.name = 'NotFoundError';
        throw error;
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(checkError(err)).send({ message: res.statusCode === 500 ? 'Произошла ошибка' : err.message }));
};
