const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking_controller');

router.post('/bookings/', bookingController.createBooking);

router.get('/bookings/all/', bookingController.getAllBookings);

router.get('/bookings/:id', bookingController.getBookingById);

router.put('/bookings/:id', bookingController.updateBookingById);

router.delete('/bookings/:id', bookingController.deleteBookingById);

router.delete('/bookings/all/', bookingController.deleteAllBookings);

module.exports = router;
