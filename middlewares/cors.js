const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'http://algrigorovich.backend.nomoredomains.sbs/',
    'https://algrigorovich.github.io/',
  ],
  // эта опция позволяет устанавливать куки
  credentials: true,
};

// eslint-disable-next-line no-unused-vars
module.exports = (req, res, next) => {
  cors(options);
};
