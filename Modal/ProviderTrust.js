const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  subtitle: {
    type: String,

  },
  providerTrustImg: {
    type: String,
  },



});


const ServiceModal = mongoose.model('providerTrust', ServiceSchema);

module.exports = ServiceModal;
