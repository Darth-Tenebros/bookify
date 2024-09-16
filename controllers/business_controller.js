const Business = require('../models/business_model');

// Create a new business
exports.createBusiness = async (req, res) => {
    const { name, owner, location, contact } = req.body;

    if (!name || !owner || !location || !contact) {
        return res.status(400).send({ message: "All fields are required." });
    }

    try {
        const business = new Business({ name, owner, location, contact });
        const result = await business.save();
        res.status(201).send({ "business":result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find({});
        res.status(200).send({ businesses });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Get business by ID
exports.getBusinessById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Business ID is required." });
    }

    try {
        const business = await Business.findById(id);
        if (!business) {
            return res.status(404).send({ message: "Business not found." });
        }
        res.status(200).send({ business });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Update business by ID
exports.updateBusinessById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).send({ message: "Business ID is required." });
    }

    try {
        const result = await Business.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Business not found." });
        }
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Delete business by ID
exports.deleteBusinessById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Business ID is required." });
    }

    try {
        const result = await Business.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Business not found." });
        }
        res.status(200).send({ message: "Business deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Delete all businesses
exports.deleteAllBusinesses = async (req, res) => {
    try {
        const result = await Business.deleteMany({});
        res.status(200).send({ message: "All businesses deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};
