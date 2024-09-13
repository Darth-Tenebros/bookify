const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    description: { type: String },
    logo: { type: String },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
  });

  module.exports = mongoose.model('Business', businessSchema);