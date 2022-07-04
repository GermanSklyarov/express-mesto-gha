require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { checkError } = require('./utils/functions');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('/', (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
  next();
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = checkError(err), message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} : ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
