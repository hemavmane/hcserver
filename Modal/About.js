const mongoose = require('mongoose');


const AboutSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  description: {
    type: String,

  },
  aboutImg: {
    type: String,
  },
 

});


const AboutModal = mongoose.model('about', AboutSchema);

module.exports = AboutModal;
