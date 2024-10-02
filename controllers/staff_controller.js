const Staff = require('../models/staff_model');

// Create a new staff member
exports.createStaff = async (req, res) => {
    const { name, business, availableHours } = req.body;

    if (!name || !business) {
        return res.status(400).send({ message: "All fields are required." });
    }

    try {
        const staff = new Staff({ name, business, availableHours });
        const result = await staff.save();
        res.status(201).send({ "staff":result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find({});
        res.status(200).send({ staff });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Get staff member by ID
exports.getStaffById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Staff ID is required." });
    }

    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).send({ message: "Staff member not found." });
        }
        res.status(200).send({ staff });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Update staff member by ID
exports.updateStaffById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).send({ message: "Staff ID is required." });
    }

    try {
        const result = await Staff.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Staff member not found." });
        }
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Delete staff member by ID
exports.deleteStaffById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Staff ID is required." });
    }

    try {
        const result = await Staff.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Staff member not found." });
        }
        res.status(200).send({ message: "Staff member deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Delete all staff members
exports.deleteAllStaff = async (req, res) => {
    try {
        const result = await Staff.deleteMany({});
        res.status(200).send({ message: "All staff members deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};
