const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62a73a96c3351c8b0fe608fa',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res, next) => {
  res.status(404).send({ message: 'Запрос не может быть обработан' });
  next();
});

app.listen(PORT, () => {
});
