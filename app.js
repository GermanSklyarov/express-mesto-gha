const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '62a639fe07641ca27ec9948a',
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use('/', cardRouter);

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} : ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
