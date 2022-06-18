const User = require('../models/user');
const { handleError, NOT_FOUND } = require('../midlewares/handleError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => handleError(err, res));
};

const findUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ user });
    })
    .catch((err) => handleError(err, res));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ user });
    })
    .catch((err) => handleError(err, res));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ user });
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  createUser,
  findUser,
  updateUserInfo,
  updateUserAvatar,
};
