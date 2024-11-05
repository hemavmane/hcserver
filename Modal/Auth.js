const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({

  username: {
    type: String,

  },
  email: {
    type: String,

  },
  password: {
    type: String,
  },
});


const Auth = mongoose.model('hcadmin', AuthSchema);

module.exports = Auth;
