const Staff = require('../models/staff_model');

exports.createStaff = async (req, res) => {
    try {
      const staff = new Staff(req.body);
      const savedStaff = await staff.save();
      res.status(201).json(savedStaff);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.getAllStaff = async (req, res) => {
    try {
      const staff = await Staff.find();
      res.status(200).json(Staff);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.deleteStaff = async (req, res) => {
    try {
      const {id}= req.params;
      const staff = await Staff.findByIdAndDelete (id);
      if (!Staff) 
        return res.status(404).json({message:'Staff not found'});
      
      res.status(200).json({message:'Staff successfully deleted'});
    } catch (error) {
      res.status(500).json({ message:'Staff deleted' });
    }
  };
exports.UpdateStaff =  async (req, res) => {
      const {id}= req.params;
      const staff = await Staff.findById (id);
      if (!Staff) {
        return res.status(404).json({message:'Staff not found'});
      }
      const { business, name, position } = req.body;
      staff.business = business || business.staff;
      staff.name = name || staff.name;
      staff.position = position || staff.position
      ;
      await staff.save();
      res.json(staff);
  };
 
