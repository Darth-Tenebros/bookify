const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Payment Controller Tests', function() {

    let token, paymentId;

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

    // Create Payment Test
    describe('POST /payments/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/payments/')
                .set('Authorization', "Bearer " + token)
                .send({
                    // Missing amount, booking
                });
            
            expect(response.statusCode).to.be.equal(400);
            expect(response.body.message).to.equal("Payment amount and booking are required.");
        });

        it('should create a payment with valid fields', async function() {
            const response = await supertest
                .post('/payments/')
                .set('Authorization', "Bearer " + token)
                .send({
                    amount: 100,
                    booking: "BookingID", // Use an appropriate ID or valid reference
                    method: "Credit Card"
                });
            
            expect(response.statusCode).to.be.equal(201);
            expect(response.body.message).to.equal("Payment created successfully.");
            paymentId = response.body.payment._id;  // Store the payment ID for future tests
        });
    });

    // Get All Payments Test
    describe('GET /payments/', function() {
        it('should return a 200 with valid token', async function() {
            const response = await supertest
                .get('/payments/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.payments).to.be.an('array');
        });

        it('should return a 403 without token', async function() {
            const response = await supertest
                .get('/payments/');
            
            expect(response.statusCode).to.be.equal(403);
        });
    });

    // Get Payment By ID Test
    describe('GET /payments/:id', function() {
        it('should return a 400 when payment ID is missing', async function() {
            const response = await supertest
                .get('/payments/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/payments/${paymentId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.payment).to.have.property('_id', paymentId);
        });
    });

    // Update Payment Test
    describe('PUT /payments/:id', function() {
        it('should return a 400 when no payment ID is provided', async function() {
            const response = await supertest
                .put('/payments/')
                .set('Authorization', "Bearer " + token)
                .send({
                    amount: 150
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing payment ID
        });

        it('should update payment details successfully', async function() {
            const response = await supertest
                .put(`/payments/${paymentId}`)
                .set('Authorization', "Bearer " + token)
                .send({
                    amount: 150,
                    method: "Debit Card"
                });
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.payment.amount).to.equal(150);
            expect(response.body.payment.method).to.equal("Debit Card");
        });
    });

    // Delete Payment Test
    describe('DELETE /payments/:id', function() {
        it('should return a 400 when no payment ID is provided', async function() {
            const response = await supertest
                .delete('/payments/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Missing payment ID
        });

        it('should delete the payment with valid ID', async function() {
            const response = await supertest
                .delete(`/payments/${paymentId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("Payment deleted successfully.");
        });
    });

    // Delete All Payments Test
    describe('DELETE /payments/', function() {
        it('should delete all payments', async function() {
            const response = await supertest
                .delete('/payments/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("All payments deleted successfully.");
        });
    });

});
