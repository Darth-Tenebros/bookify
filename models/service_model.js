const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Service', serviceSchema);
  