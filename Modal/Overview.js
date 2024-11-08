const mongoose = require('mongoose');


const AboutSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  logo: {
    type: String,

  },
  counts: {
    type: String,
  },

  order: {
    type: String
  }
});


const AboutModal = mongoose.model('overview', AboutSchema);

module.exports = AboutModal;
