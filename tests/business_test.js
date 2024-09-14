const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Business Controller Tests', function() {

    let token, businessId;

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

    // Create Business Test
    describe('POST /businesses/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/businesses/')
                .set('Authorization', "Bearer " + token)
                .send({
                    // Missing name and address
                });
            
            expect(response.statusCode).to.be.equal(400);
            expect(response.body.message).to.equal("Business name and address are required.");
        });

        it('should create a business with valid fields', async function() {
            const response = await supertest
                .post('/businesses/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Business Example",
                    address: "123 Example St",
                    contact: "contact@example.com"
                });
            
            expect(response.statusCode).to.be.equal(201);
            expect(response.body.message).to.equal("Business created successfully.");
            businessId = response.body.business._id;  // Store the business ID for future tests
        });
    });

    // Get All Businesses Test
    describe('GET /businesses/', function() {
        it('should return a 200 with valid token', async function() {
            const response = await supertest
                .get('/businesses/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.businesses).to.be.an('array');
        });

        it('should return a 403 without token', async function() {
            const response = await supertest
                .get('/businesses/');
            
            expect(response.statusCode).to.be.equal(403);
        });
    });

    // Get Business By ID Test
    describe('GET /businesses/:id', function() {
        it('should return a 400 when business ID is missing', async function() {
            const response = await supertest
                .get('/businesses/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/businesses/${businessId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.business).to.have.property('_id', businessId);
        });
    });

    // Update Business Test
    describe('PUT /businesses/:id', function() {
        it('should return a 400 when no business ID is provided', async function() {
            const response = await supertest
                .put('/businesses/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Business Name"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing business ID
        });

        it('should update business details successfully', async function() {
            const response = await supertest
                .put(`/businesses/${businessId}`)
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Business Example",
                    address: "456 Updated St"
                });
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.business.name).to.equal("Updated Business Example");
            expect(response.body.business.address).to.equal("456 Updated St");
        });
    });

    // Delete Business Test
    describe('DELETE /businesses/:id', function() {
        it('should return a 400 when no business ID is provided', async function() {
            const response = await supertest
                .delete('/businesses/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Missing business ID
        });

        it('should delete the business with valid ID', async function() {
            const response = await supertest
                .delete(`/businesses/${businessId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("Business deleted successfully.");
        });
    });

    // Delete All Businesses Test
    describe('DELETE /businesses/', function() {
        it('should delete all businesses', async function() {
            const response = await supertest
                .delete('/businesses/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("All businesses deleted successfully.");
        });
    });

});
