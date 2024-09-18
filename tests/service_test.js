const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Service Controller Tests', function() {
    this.timeout(10000);

    let serviceId;

    
    describe('POST /services/', function() {
        this.timeout(10000);
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/api/services/')
                .send({
                    // Missing name, business, and price
                });
            
            expect(response.statusCode).to.be.equal(400);
        });

        it('should create a service with valid fields', async function() {
            const response = await supertest
                .post('/api/services/')
                .send({
                    duration: 40,
                    name: "Haircut",
                    business: "66e7068a2955b15c93251fb0",
                    price: 30
                });
            
            expect(response.statusCode).to.be.equal(201);
            serviceId = response.body.service._id;
        });
    });


    describe('GET /services/', function() {
        this.timeout(10000);
        it('should return a 200 with valid request', async function() {
            const response = await supertest
                .get('/api/services/all/');
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    
    describe('GET /services/:id', function() {
        this.timeout(10000);
        it('should return a 404 when service ID is missing', async function() {
            const response = await supertest
                .get('/api/services/')  // Trying to get service without ID
                .send();  // No ID provided
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/api/services/${serviceId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('PUT /services/:id', function() {
        this.timeout(10000);
        it('should return a 404 when no service ID is provided', async function() {
            const response = await supertest
                .put('/api/services/')
                .send({
                    name: "Updated Service",
                    price: 35
                });
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should update service details successfully', async function() {
            const response = await supertest
                .put(`/api/services/${serviceId}`)
                .send({
                    name: "Updated Haircut",
                    price: 40
                });
            
            expect(response.statusCode).to.be.equal(200);
        });
    });


    describe('DELETE /services/:id', function() {
        this.timeout(10000);
        it('should return a 404 when no service ID is provided', async function() {
            const response = await supertest
                .delete('/api/services/')
                .send();  // No ID provided
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should delete the service with valid ID', async function() {
            const response = await supertest
                .delete(`/api/services/${serviceId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    // Delete All Services Test
    // describe('DELETE /services/', function() {
    //     it('should delete all services', async function() {
    //         const response = await supertest
    //             .delete('/services/');
            
    //         expect(response.statusCode).to.be.equal(200);
    //     });
    // });

});
