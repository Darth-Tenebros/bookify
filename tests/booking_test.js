const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Booking Controller Tests', function() {
    this.timeout(10000);
    
    let bookingId;

    describe('POST /bookings/', function() {
        this.timeout(20000);
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/api/bookings/')
                .send({
                    user: "John Doe",
                    business: "BusinessID"
                    // Missing service, staff, date, time, payment details
                });
            
            expect(response.statusCode).to.be.equal(400);
        });

        it('should create a booking with valid fields', async function() {
            const response = await supertest
                .post('/api/bookings/')
                .send({
                    user: "66e706892955b15c93251fa4",
                    business: "66e7068a2955b15c93251fa6",
                    service: "66e7068a2955b15c93251fa9",
                    staff: "66e7068a2955b15c93251fad",
                    date: new Date(),
                    time: Date.now(),
                    amount: 100,
                    status: 'confirmed'
                });
            
            expect(response.statusCode).to.be.equal(201);
            bookingId = response.body.booking._id;
        });
    });

    describe('GET /bookings/', function() {
        this.timeout(10000);
        it('should return a 200 with valid data', async function() {
            const response = await supertest.get('/api/bookings/all/');
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('GET /bookings/:id', function() {
        this.timeout(10000);
        it('should return a 400 when booking ID is missing', async function() {
            const response = await supertest.get('/api/bookings/');
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest.get(`/api/bookings/${bookingId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });


    describe('PUT /bookings/:id', function() {
        this.timeout(10000);
        it('should return a 400 when no booking ID is provided', async function() {
            const response = await supertest
                .put('/api/bookings/')
                .send({
                    date: "2024-09-15",
                    time: "16:00"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing booking ID
        });

        it('should update booking details successfully', async function() {
            const response = await supertest
                .put(`/api/bookings/${bookingId}`)
                .send({
                    date: "2024-09-15",
                    time: "16:00"
                });
            
            expect(response.statusCode).to.be.equal(200);
        });
    });


    describe('DELETE /bookings/:id', function() {
        this.timeout(10000);
        it('should return a 400 when no booking ID is provided', async function() {
            const response = await supertest.delete('/api/bookings/');
            
            expect(response.statusCode).to.be.equal(404);  // Missing booking ID
        });

        it('should delete the booking with valid ID', async function() {
            const response = await supertest.delete(`/api/bookings/${bookingId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    // Delete All Bookings Test
    // describe('DELETE /bookings/', function() {
    //     it('should delete all bookings', async function() {
    //         const response = await supertest.delete('/bookings/');
            
    //         expect(response.statusCode).to.be.equal(200);
    //     });
    // });
    

});
