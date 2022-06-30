const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  findUser,
  updateUserInfo,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), findUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/),
  }),
}), updateUserAvatar);

module.exports = router;
