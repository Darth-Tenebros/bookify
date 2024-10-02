const Booking = require('../models/booking_model');


exports.createBooking = async (req, res) => {
    const { user, business, service, staff, date, time } = req.body;

    if (!user || !business || !service || !staff || !date || !time) {
        return res.status(400).send({ message: "All fields are required." });
    }

    try {
        const booking = new Booking({ user, business, service, staff, date, time, status: 'pending' });
        const result = await booking.save();
        res.status(201).send({ "booking": result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
                            .populate('user', '-password')
                            .populate('business')
                            .populate('service')
                            .populate('staff');
        res.status(200).send({ bookings });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.getBookingById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Booking ID is required." });
    }

    try {
        const booking = await Booking.findById(id);
        if(!booking) {
            return res.status(404).send({ message: "Booking not found." });
        }
        res.status(200).send({ "booking": booking });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.updateBookingById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).send({ message: "Booking ID is required." });
    }

    try {
        const result = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Booking not found." });
        }
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.deleteBookingById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Booking ID is required." });
    }

    try {
        const result = await Booking.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Booking not found." });
        }
        res.status(200).send({ message: "Booking deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};


exports.deleteAllBookings = async (req, res) => {
    try {
        const result = await Booking.deleteMany({});
        res.status(200).send({ message: "All bookings deleted." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
};
