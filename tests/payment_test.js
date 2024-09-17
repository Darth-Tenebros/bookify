const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Payment Controller Tests', function() {

    let paymentId;

    // Create Payment Test
    describe('POST /payments/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/api/payments/')
                .send({
                    // Missing amount and booking
                });
            
            expect(response.statusCode).to.be.equal(400);
        });

        it('should create a payment with valid fields', async function() {
            const response = await supertest
                .post('/api/payments/')
                .send({
                    amount: 100,
                    booking: "66e7068a2955b15c93251fb0",
                    method: "example",
                    status: "completed",
                });
            
            expect(response.statusCode).to.be.equal(201);
            paymentId = response.body.payment._id;  // Store the payment ID for future tests
        });
    });

    describe('GET /payments/', function() {
        it('should return a 200 with valid request', async function() {
            const response = await supertest
                .get('/api/payments/all/');
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    // Get Payment By ID Test
    describe('GET /payments/:id', function() {
        it('should return a 404 when payment ID is missing', async function() {
            const response = await supertest
                .get(`/api/payments/`)
                .send();  // No ID provided
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/api/payments/${paymentId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('PUT /payments/:id', function() {
        it('should return a 404 when no payment ID is provided', async function() {
            const response = await supertest
                .put('/api/payments/')
                .send({
                    amount: 150
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing payment ID
        });

        it('should update payment details successfully', async function() {
            const response = await supertest
                .put(`/api/payments/${paymentId}`)
                .send({
                    amount: 150,
                    status: "pending",  // Ensure status is valid
                    paymentMethod: "Updated payment method"
                });
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('DELETE /payments/:id', function() {
        it('should return a 404 when no payment ID is provided', async function() {
            const response = await supertest
                .delete('/api/payments/')
                .send();  // No ID provided
            
            expect(response.statusCode).to.be.equal(404);  // Missing payment ID
        });

        it('should delete the payment with valid ID', async function() {
            const response = await supertest
                .delete(`/api/payments/${paymentId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    // Delete All Payments Test
    // describe('DELETE /payments/', function() {
    //     it('should delete all payments', async function() {
    //         const response = await supertest
    //             .delete('/payments/');
            
    //         expect(response.statusCode).to.be.equal(200);
    //     });
    // });
});
