const Payment = require('../models/payment_model');


exports.createPayment = async (req, res) => {
    const { amount, booking, method, status } = req.body;

    if (!amount || !booking) {
        return res.status(400).send({
            message: "Amount and booking ID are required."
        });
    }

    try {
        // before, should actually call a payment service e.g: stripe/ukheshe.
        const payment = new Payment({
            amount,
            booking,
            paymentMethod: method || 'credit_card', // default method if not provided
            status: status || 'pending', // default status if not provided\
        });

        const result = await payment.save();
        res.status(201).send({
            message: "Payment created successfully.",
            payment: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
};


exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.status(200).send({
            message: "Payments retrieved successfully.",
            payments
        });
    } catch (error) {
        res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
};


exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).send({
            message: "Payment ID is required."
        });
    }

    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).send({
                message: "Payment not found."
            });
        }

        res.status(200).send({
            message: "Payment retrieved successfully.",
            payment
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
};


exports.updatePaymentById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).send({
            message: "Payment ID is required."
        });
    }

    try {
        const payment = await Payment.findByIdAndUpdate(id, updatedData, { new: true });
        if (!payment) {
            return res.status(404).send({
                message: "Payment not found."
            });
        }

        res.status(200).send({
            message: "Payment updated successfully.",
            payment
        });
    } catch (error) {
        res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
};


exports.deletePaymentById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({
            message: "Payment ID is required."
        });
    }

    try {
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).send({
                message: "Payment not found."
            });
        }

        res.status(200).send({
            message: "Payment deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
};


exports.deleteAllPayments = async (req, res) => {
    try {
        await Payment.deleteMany({});
        res.status(200).send({
            message: "All payments deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
};
