const mongoose = require('mongoose');
const User = require('../models/user_model');
const Business = require('../models/business_model');
const Service = require('../models/service_model');
const Staff = require('../models/staff_model');
const Booking = require('../models/booking_model');
const Payment = require('../models/payment_model');

const {hashPassword} = require('../middleware/auth/authentication');



const connectToDB = require('./config');
connectToDB();

// Function to seed the database with values for all models
const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Business.deleteMany({});
        await Service.deleteMany({});
        await Staff.deleteMany({});
        await Booking.deleteMany({});
        await Payment.deleteMany({});
        

        // Seed Users
        const users = await User.insertMany([
            { name: 'Alice Smith', email: 'alice@example.com', password: hashPassword('password1'), role: 'customer' },
            { name: 'Bob Johnson', email: 'bob@example.com', password: hashPassword('password2'), role: 'business_owner' },
            { name: 'james allison', email: 'james@example.com', password: hashPassword('password3'), role: 'business_owner' },
            { name: 'toto wolff', email: 'toto@example.com', password: hashPassword('password4'), role: 'business_owner' }
        ]);

        // Seed Businesses
        const businesses = await Business.insertMany([
            { name: 'Beauty Salon', owner: users[1]._id, location: '123 Main St', contact: '123-456-7890', services: [], staff: [] }
        ]);

        // Seed Services
        const services = await Service.insertMany([
            { name: 'Haircut', description: 'Basic haircut', price: 30, duration: 30, business: businesses[0]._id },
            { name: 'Massage', description: 'Full body massage', price: 100, duration: 30, business: businesses[0]._id }
        ]);

        // Update Business with Services
        await Business.findByIdAndUpdate(businesses[0]._id, { services: services.map(service => service._id) });

        // Seed Staff
        const staff = await Staff.insertMany([
            { name: 'Jessica', role: 'Stylist', business: businesses[0]._id },
            { name: 'Michael', role: 'Masseur', business: businesses[0]._id }
        ]);

        // Update Business with Staff
        await Business.findByIdAndUpdate(businesses[0]._id, { staff: staff.map(s => s._id) });

        // Seed Bookings
        const bookings = await Booking.insertMany([
            {
                user: users[0]._id,
                email: users[0].email,
                phone: '123-456-7890',
                business: businesses[0]._id,
                service: services[0]._id,
                staff: staff[0]._id,
                date: new Date(),
                time: Date.now(),
                status: 'pending'
            },
            {
                user: users[0]._id,
                email: users[0].email,
                phone: '123-456-7890',
                business: businesses[0]._id,
                service: services[1]._id,
                staff: staff[1]._id,
                date: new Date(),
                time: Date.now(),
                status: 'pending'
            }
        ]);

        // Seed Payments
        const payments = await Payment.insertMany([
            {
                amount: services[0].price,
                booking: bookings[0]._id,
                method: 'credit_card',
                status: 'completed',
                time: new Date(),
                paymentMethod: "i take your wife and put it in the oven"
            },
            {
                amount: services[1].price,
                booking: bookings[1]._id,
                method: 'paypal',
                status: 'pending',
                time: new Date(),
                paymentMethod: "you never give me"
            }
        ]);

        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
};

// seedDatabase();

//test comment

module.exports = seedDatabase;
