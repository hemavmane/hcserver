const mongoose = require('mongoose');


const BannerSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  subtitle: {
    type: String,

  },
  bannerImg: {
    type: String,
  },
  btnText: {
    type: String,
  },
  btnColor: {
    type: String,
  },

});


const BannerModal = mongoose.model('banner', BannerSchema);

module.exports = BannerModal;
