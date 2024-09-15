const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String, // e.g., '15:00'
      required: true
    },
    status: {
      type: String,
      enum: {values: ['pending', 'confirmed', 'cancelled'], message: "booking model values"},
      default: 'pending'
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Booking', bookingSchema);
  