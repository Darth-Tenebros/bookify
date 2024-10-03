const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user_model');
const Business = require('../models/business_model');
const Service = require('../models/service_model');
const Staff = require('../models/staff_model');
const Booking = require('../models/booking_model');
const Payment = require('../models/payment_model');

const {hashPassword} = require('../middleware/auth/authentication');



const connectToDB = require('./config');
connectToDB();

const convertImageToBase64 = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    const base64Str = fileData.toString('base64');

    return base64Str;
}

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
            { name: 'palesa', email: 'palesa@example.com', password: hashPassword('password1'), role: 'customer' },
            { name: 'Sis\' Gloria', email: 'gloria@example.com', password: hashPassword('password2'), role: 'business_owner' },
            { name: 'Sisanda', email: 'sisanda@example.com', password: hashPassword('password3'), role: 'customer' },
            { name: 'Ta Mzi', email: 'mziwabantu@example.com', password: hashPassword('password4'), role: 'business_owner' },
            { name: 'Sihle Golani', email: 'sihle@example.com', password: hashPassword('password5'), role: 'business_owner' },
            { name: 'Bahle Ntonintshi', email: 'bahle@example.com', password: hashPassword('password6'), role: 'business_owner' },
            { name: 'Mam\' Gladis', email: 'gladis@example.com', password: hashPassword('password7'), role: 'business_owner' },
            { name: 'Mam\' Sarah', email: 'sarah@example.com', password: hashPassword('password8'), role: 'business_owner' },
            { name: 'Ta Skhu', email: 'skhumbuzo@example.com', password: hashPassword('password9'), role: 'business_owner' },
            { name: 'Sis\' Nandi', email: 'nandi@example.com', password: hashPassword('password10'), role: 'business_owner' },
            { name: 'John', email: 'john@example.com', password: hashPassword('password11'), role: 'business_owner' }
        ]);

        // Seed Businesses
        const businesses = await Business.insertMany([
            { name: 'Beauty Salon', owner: users[1]._id, location: '123 Main St', contact: '123-456-7890', services: [], staff: [] },
            { name: 'Glamour Hair Studio', owner: users[5]._id, location: '789 Oak St', contact: '456-789-1230', services: [], staff: [] },
            { name: 'Urban Style Salon', owner: users[6]._id, location: '321 Pine St', contact: '654-321-9870', services: [], staff: [] },
            { name: 'The Hair Lounge', owner: users[8]._id, location: '222 Cedar St', contact: '852-963-7410', services: [], staff: [] },
            { name: 'Elite Beauty', owner: users[9]._id, location: '333 Birch St', contact: '753-159-4860', services: [], staff: [] },
            { name: 'Glow & Shine', owner: users[10]._id, location: '444 Spruce St', contact: '951-357-4680', services: [], staff: [] },
            { name: 'Pure Bliss', owner: users[4]._id, location: '555 Cypress St', contact: '753-951-4682', services: [], staff: [] },
            { name: 'Beauty Haven', owner: users[5]._id, location: '666 Willow St', contact: '654-789-9512', services: [], staff: [] }
        ]);

        // Seed Services (Same services for all businesses)
        const servicesPromises = businesses.map(business => {
            return Service.insertMany([
                { name: 'Amancanca', description: 'amancanca', price: 30, duration: 30, business: business._id, image: convertImageToBase64('../images/amancanca.jpg') },
                { name: 'Cornrows', description: 'flat braided hair', price: 100, duration: 30, business: business._id, image: convertImageToBase64('../images/cornrows.jpg') },
                { name: 'Dreadlocks', description: 'dreadlock starting, washing, and styling', price: 100, duration: 30, business: business._id, image: convertImageToBase64('../images/dreadlocks.jpg')},
                { name: 'Hair Treatment', description: 'hair wash and blow out', price: 100, duration: 30, business: business._id, image: convertImageToBase64('../images/hair_wash.jpg') },
                { name: 'Straight back', description: 'Straight back braids', price: 100, duration: 30, business: business._id, image: convertImageToBase64('../images/straight_back.jpg') },
            ]);
        });

        const servicesList = await Promise.all(servicesPromises);

        // Update Businesses with Services
        for (let i = 0; i < businesses.length; i++) {
            await Business.findByIdAndUpdate(businesses[i]._id, { services: servicesList[i].map(service => service._id) });
        }

        // Seed Staff for each business
        const staffPromises = businesses.map(business => {
            return Staff.insertMany([
                { name: 'Jessica', role: 'Stylist', business: business._id },
                { name: 'Michael', role: 'Masseur', business: business._id }
            ]);
        });

        const staffList = await Promise.all(staffPromises);

        // Update Businesses with Staff
        for (let i = 0; i < businesses.length; i++) {
            await Business.findByIdAndUpdate(businesses[i]._id, { staff: staffList[i].map(s => s._id) });
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
};


seedDatabase();

//test comment

module.exports = seedDatabase;
