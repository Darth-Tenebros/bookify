const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
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
    },
    image: {
      type: String,
      required: false
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Service', serviceSchema);
  