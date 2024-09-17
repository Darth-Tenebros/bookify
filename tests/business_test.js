const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Business Controller Tests', function() {

    let businessId;

    describe('POST /businesses/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/api/businesses/')
                .send({
                    // Missing name and address
                });
            
            expect(response.statusCode).to.be.equal(400);
        });

        it('should create a business with valid fields', async function() {
            const response = await supertest
                .post('/api/businesses/')
                .send({
                    name: "beauty bar",
                    owner: "66e86532f72b2f91d868398a",
                    services: ["66e86532f72b2f91d8683990", "66e86532f72b2f91d8683990"],
                    staff: ["64e85f1f10481ec35c7213dd"],
                    location: "123 Example St",
                    contact: "contact@example.com"
                });
            
            
            expect(response.statusCode).to.be.equal(201);
            businessId = response.body.business._id;
        });
    });


    describe('GET /businesses/', function() {
        it('should return a 200', async function() {
            const response = await supertest
                .get('/api/businesses/all/');
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('GET /businesses/:id', function() {
        it('should return a 400 when business ID is missing', async function() {
            const response = await supertest
                .get('/api/businesses/');
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/api/businesses/${businessId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });
    

    describe('PUT /businesses/:id', function() {
        it('should return a 400 when no business ID is provided', async function() {
            const response = await supertest
                .put('/api/businesses/')
                .send({
                    name: "Updated Business Name"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing business ID
        });

        it('should update business details successfully', async function() {
            const response = await supertest
                .put(`/api/businesses/${businessId}`)
                .send({
                    name: "Updated Business Example",
                    address: "456 Updated St"
                });
            
            expect(response.statusCode).to.be.equal(200);
        });
    });


    describe('DELETE /businesses/:id', function() {
        it('should return a 400 when no business ID is provided', async function() {
            const response = await supertest
                .delete('/api/businesses/');
            
            expect(response.statusCode).to.be.equal(404);  // Missing business ID
        });

        it('should delete the business with valid ID', async function() {
            const response = await supertest
                .delete(`/api/businesses/${businessId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    // describe('DELETE /businesses/', function() {
    //     it('should delete all businesses', async function() {
    //         const response = await supertest
    //             .delete('/api/businesses/');
            
    //         expect(response.statusCode).to.be.equal(200);
    //     });
    // });

});
