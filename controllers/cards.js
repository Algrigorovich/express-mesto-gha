const Card = require('../models/card');
const handleErrors = require('../midlewares/helpers');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => handleErrors(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card, message: 'Карточка добавлена' }))
    .catch((err) => handleErrors(err, res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка c указанным id не найдена' });
      }
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => handleErrors(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка по указанному _id не найдена.' });
      }
      return res.status(200).send({ card });
    })
    .catch((err) => handleErrors(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка по указанному _id не найдена.' });
      }
      return res.status(200).send({ card });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
