const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Staff Controller Tests', function() {
    this.timeout(10000);

    let staffId;

    describe('POST /staff/', function() {
        this.timeout(20000);
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/api/staff/')
                .send({
                    // Missing name and business
                });
            
            expect(response.statusCode).to.be.equal(400);
        });

        it('should create a staff with valid fields', async function() {
            const response = await supertest
                .post('/api/staff/')
                .send({
                    name: "Jane Doe",
                    business: "66e86a77635f75c24c1c6ec5",
                    role: "Stylist"
                });
            
            expect(response.statusCode).to.be.equal(201);
            staffId = response.body.staff._id;
        });
    });

    
    describe('GET /staff/', function() {
        this.timeout(10000);
        it('should return a 200 with all staff', async function() {
            const response = await supertest
                .get('/api/staff/all');
            
            expect(response.statusCode).to.be.equal(200);
        });
    });


    describe('GET /staff/:id', function() {
        this.timeout(10000);
        it('should return a 404 when staff ID is missing', async function() {
            const response = await supertest
                .get('/api/staff/');
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/api/staff/${staffId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('PUT /staff/:id', function() {
        this.timeout(10000);
        it('should return a 404 when no staff ID is provided', async function() {
            const response = await supertest
                .put('/api/staff/')
                .send({
                    name: "Updated Name"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing staff ID
        });

        it('should update staff details successfully', async function() {
            const response = await supertest
                .put(`/api/staff/${staffId}`)
                .send({
                    name: "Updated Jane Doe",
                    role: "Senior Stylist"
                });
            
            expect(response.statusCode).to.be.equal(200);
        });
    });


    describe('DELETE /staff/:id', function() {
        this.timeout(10000);
        it('should return a 404 when no staff ID is provided', async function() {
            const response = await supertest
                .delete('/api/staff/');
            
            expect(response.statusCode).to.be.equal(404);  // Missing staff ID
        });

        it('should delete the staff with valid ID', async function() {
            const response = await supertest
                .delete(`/api/staff/${staffId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    
    // describe('DELETE /staff/', function() {
    //     it('should delete all staff', async function() {
    //         const response = await supertest
    //             .delete('/staff/');
            
    //         expect(response.statusCode).to.be.equal(200);
    //         expect(response.body.message).to.equal("All staff deleted successfully.");
    //     });
    // });

});
