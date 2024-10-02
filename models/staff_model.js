const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true
    },
    availableHours: [{
      day: String,  // e.g., 'Monday'
      start: String, // e.g., '09:00'
      end: String    // e.g., '17:00'
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Staff', staffSchema);
  