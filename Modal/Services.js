const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  subtitle: {
    type: String,

  },
  serviceImg: {
    type: String,
  },

  offerPrice: {
    type: String,
  },
  realPrice: {
    type: String,
  },
  description: {
    type: String,
  },

});


const ServiceModal = mongoose.model('service', ServiceSchema);

module.exports = ServiceModal;
