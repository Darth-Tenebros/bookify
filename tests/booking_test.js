const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Booking Controller Tests', function() {
    
    let token, bookingId;

    // Login to get the token
    before(async function() {
        const loginResponse = await supertest
            .post('/login')
            .send({
                "email": "johnson@example.com",
                "password": "password1"
            });

        token = loginResponse._body.data;  // Assume token is in the data field
    });

    // Create Booking Test
    describe('POST /bookings/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/bookings/')
                .set('Authorization', "Bearer " + token)
                .send({
                    user: "John Doe",
                    business: "BusinessID"
                    // Missing service, staff, date, time, payment details
                });
            
            expect(response.statusCode).to.be.equal(400);
            expect(response.body.message).to.equal("All fields, including payment details, are required.");
        });

        it('should create a booking with valid fields', async function() {
            const response = await supertest
                .post('/bookings/')
                .set('Authorization', "Bearer " + token)
                .send({
                    user: "John Doe",
                    business: "BusinessID",
                    service: "ServiceID",
                    staff: "StaffID",
                    date: "2024-09-14",
                    time: "14:00",
                    payment_method: "credit card",
                    amount: 100
                });
            
            expect(response.statusCode).to.be.equal(201);
            expect(response.body.message).to.equal("Booking created successfully with payment.");
            bookingId = response.body.booking._id;  // Store the booking ID for future tests
        });
    });

    // Get All Bookings Test
    describe('GET /bookings/', function() {
        it('should return a 200 with valid token', async function() {
            const response = await supertest
                .get('/bookings/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.bookings).to.be.an('array');
        });

        it('should return a 403 without token', async function() {
            const response = await supertest
                .get('/bookings/');
            
            expect(response.statusCode).to.be.equal(403);
        });
    });

    // Get Booking By ID Test
    describe('GET /bookings/:id', function() {
        it('should return a 400 when booking ID is missing', async function() {
            const response = await supertest
                .get('/bookings/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/bookings/${bookingId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.booking).to.have.property('_id', bookingId);
        });
    });

    // Update Booking Test
    describe('PUT /bookings/:id', function() {
        it('should return a 400 when no booking ID is provided', async function() {
            const response = await supertest
                .put('/bookings/')
                .set('Authorization', "Bearer " + token)
                .send({
                    date: "2024-09-15",
                    time: "16:00"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing booking ID
        });

        it('should update booking details successfully', async function() {
            const response = await supertest
                .put(`/bookings/${bookingId}`)
                .set('Authorization', "Bearer " + token)
                .send({
                    date: "2024-09-15",
                    time: "16:00"
                });
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.booking.date).to.equal("2024-09-15");
            expect(response.body.booking.time).to.equal("16:00");
        });
    });

    // Delete Booking Test
    describe('DELETE /bookings/:id', function() {
        it('should return a 400 when no booking ID is provided', async function() {
            const response = await supertest
                .delete('/bookings/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Missing booking ID
        });

        it('should delete the booking with valid ID', async function() {
            const response = await supertest
                .delete(`/bookings/${bookingId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("Booking and payment deleted successfully.");
        });
    });

    // Delete All Bookings Test
    describe('DELETE /bookings/', function() {
        it('should delete all bookings', async function() {
            const response = await supertest
                .delete('/bookings/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("All bookings and payments deleted successfully.");
        });
    });

});
