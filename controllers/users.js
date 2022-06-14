const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка получения списка пользователей' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar} = req.body;

  User.create({ name, about, avatar } )
    .populate('user')
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при добавлении пользователя' }));
}

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUserInfo = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: userInfo }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUserAvatar= (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: link }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
