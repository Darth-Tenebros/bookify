const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    business: {  type:String, ref:"Business",required: true, },
    name: { type: String, required: true },
    position: { type: String, required: true },
});

module.exports = mongoose.model('Staff', staffSchema);