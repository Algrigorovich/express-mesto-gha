// const NOT_FOUND = 404;
const WRONG_DATA = 400;
const SERVER_ERROR = 500;

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные.' });
  }
  return res.status(SERVER_ERROR).send({ message: `Произошла ошибка ${err.name}` });
};

module.exports = { handleErrors };
