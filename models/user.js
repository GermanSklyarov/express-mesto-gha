const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v.length >= 2 && v.length <= 30;
      },
      message: 'Длина должна быть от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v.length >= 2 && v.length <= 30;
      },
      message: 'Длина должна быть от 2 до 30 символов',
    },
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
