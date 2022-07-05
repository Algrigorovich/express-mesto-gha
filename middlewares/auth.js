const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-secret-code');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
