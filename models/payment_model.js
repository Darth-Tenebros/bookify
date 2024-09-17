const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: {values: ['pending', 'completed', 'failed'], message: "payment model values"},
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  