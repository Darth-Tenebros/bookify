const Service = require('../models/service_model');


exports.createService = async (req, res) => {
    const { name, duration, price, business } = req.body;

    if (!name || !duration || !price || !business) {
        return res.status(400).send({ message: "All fields are required." });
    }

    try {
        const service = new Service({ name, duration, price, business });
        const result = await service.save();
        res.status(201).send({ service: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).send({ services });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.getServiceById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Service ID is required." });
    }

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).send({ message: "Service not found." });
        }
        res.status(200).send({ service });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.updateServiceById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).send({ message: "Service ID is required." });
    }

    try {
        const result = await Service.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Service not found." });
        }
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.deleteServiceById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Service ID is required." });
    }

    try {
        const result = await Service.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Service not found." });
        }
        res.status(200).send({ message: "Service deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.deleteAllServices = async (req, res) => {
    try {
        const result = await Service.deleteMany({});
        res.status(200).send({ message: "All services deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};
