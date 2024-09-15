const User = require('../models/user_model');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).send({
            message: "All fields are required."
        });
    }

    try {
        const user = new User({ name, email, password, role });
        const result = await user.save();
        res.status(201).send({ result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "User ID is required." });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).send({ message: "User ID is required." });
    }

    try {
        const result = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "User ID is required." });
    }

    try {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ message: "User deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};

// Delete all users
exports.deleteAllUsers = async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.status(200).send({ message: "All users deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};
