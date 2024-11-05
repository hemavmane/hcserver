const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  subtitle:{  type: String,},
  blogImg: {
    type: String,
  },
  page_slug:{
    type: String,
  }
  
});


const BlogModal = mongoose.model('blog', BlogSchema);

module.exports = BlogModal;
