const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Service Controller Tests', function() {

    let token, serviceId;

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

    // Create Service Test
    describe('POST /services/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/services/')
                .set('Authorization', "Bearer " + token)
                .send({
                    // Missing name, business, and price
                });
            
            expect(response.statusCode).to.be.equal(400);
            expect(response.body.message).to.equal("Service name, business, and price are required.");
        });

        it('should create a service with valid fields', async function() {
            const response = await supertest
                .post('/services/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Haircut",
                    business: "BusinessID",
                    price: 30
                });
            
            expect(response.statusCode).to.be.equal(201);
            expect(response.body.message).to.equal("Service created successfully.");
            serviceId = response.body.service._id;  // Store the service ID for future tests
        });
    });

    // Get All Services Test
    describe('GET /services/', function() {
        it('should return a 200 with valid token', async function() {
            const response = await supertest
                .get('/services/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.services).to.be.an('array');
        });

        it('should return a 403 without token', async function() {
            const response = await supertest
                .get('/services/');
            
            expect(response.statusCode).to.be.equal(403);
        });
    });

    // Get Service By ID Test
    describe('GET /services/:id', function() {
        it('should return a 400 when service ID is missing', async function() {
            const response = await supertest
                .get('/services/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/services/${serviceId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.service).to.have.property('_id', serviceId);
        });
    });

    // Update Service Test
    describe('PUT /services/:id', function() {
        it('should return a 400 when no service ID is provided', async function() {
            const response = await supertest
                .put('/services/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Service"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing service ID
        });

        it('should update service details successfully', async function() {
            const response = await supertest
                .put(`/services/${serviceId}`)
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Haircut",
                    price: 40
                });
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.service.name).to.equal("Updated Haircut");
            expect(response.body.service.price).to.equal(40);
        });
    });

    // Delete Service Test
    describe('DELETE /services/:id', function() {
        it('should return a 400 when no service ID is provided', async function() {
            const response = await supertest
                .delete('/services/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Missing service ID
        });

        it('should delete the service with valid ID', async function() {
            const response = await supertest
                .delete(`/services/${serviceId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("Service deleted successfully.");
        });
    });

    // Delete All Services Test
    describe('DELETE /services/', function() {
        it('should delete all services', async function() {
            const response = await supertest
                .delete('/services/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("All services deleted successfully.");
        });
    });

});
