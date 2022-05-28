const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name.'],
    unique: true
  },
  heat: String,
  maturity: String,
  plantcolor: String,
  podcolor: String,
})

module.exports = mongoose.model('Plant', plantSchema, 'peppers');