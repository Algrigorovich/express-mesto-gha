const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const findUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.status(200).res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.status(200).res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const updateUserAvatar = (req, res) => {
  const newAvatar = req.body.avatar;
  const userId = req.user._id;
  User.findOneAndUpdate(userId, { avatar: newAvatar }, { new: true })
    .then((user) => res.status(200).res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  createUser,
  findUser,
  updateUserInfo,
  updateUserAvatar,
};
