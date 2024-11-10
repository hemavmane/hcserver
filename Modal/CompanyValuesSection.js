const mongoose = require('mongoose');


const CompanyValuesSection = new mongoose.Schema({
  title: {
    type: String,

  },
  logo: {
    type: String,

  },
  description: {
    type: Number,
  },

  order: {
    type: Number
  }
});


const CompanyValuesModal = mongoose.model('companyvalues', CompanyValuesSection);

module.exports = CompanyValuesModal;
