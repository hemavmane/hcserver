const mongoose = require('mongoose');


const MissionSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  subtitle: { type: String, },
  missionImg: {
    type: String,
  },

  order:{type:Number}
});


const MissionModal = mongoose.model('mission', MissionSchema);

module.exports = MissionModal;
