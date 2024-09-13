const Business = require('../models/business_model'); 

exports.createBusiness= async (req, res) => {
  try {
    const business = new Business(req.body);
    const savedBusiness = await business.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBusiness = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.status(404).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBusiness);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteAllBusinesses = async (req, res) => {
  try {
    await Business.deleteMany();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAllBusinesses = async (req, res) => {
  try {
    const updatedBusinesses = await Business.updateMany({}, req.body); 
    res.status(200).json(updatedBusinesses); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
