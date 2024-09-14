const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('Staff Controller Tests', function() {

    let token, staffId;

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

    // Create Staff Test
    describe('POST /staff/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/staff/')
                .set('Authorization', "Bearer " + token)
                .send({
                    // Missing name and business
                });
            
            expect(response.statusCode).to.be.equal(400);
            expect(response.body.message).to.equal("Staff name and business are required.");
        });

        it('should create a staff with valid fields', async function() {
            const response = await supertest
                .post('/staff/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Jane Doe",
                    business: "BusinessID",
                    role: "Stylist"
                });
            
            expect(response.statusCode).to.be.equal(201);
            expect(response.body.message).to.equal("Staff created successfully.");
            staffId = response.body.staff._id;  // Store the staff ID for future tests
        });
    });

    // Get All Staff Test
    describe('GET /staff/', function() {
        it('should return a 200 with valid token', async function() {
            const response = await supertest
                .get('/staff/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.staff).to.be.an('array');
        });

        it('should return a 403 without token', async function() {
            const response = await supertest
                .get('/staff/');
            
            expect(response.statusCode).to.be.equal(403);
        });
    });

    // Get Staff By ID Test
    describe('GET /staff/:id', function() {
        it('should return a 400 when staff ID is missing', async function() {
            const response = await supertest
                .get('/staff/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/staff/${staffId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.staff).to.have.property('_id', staffId);
        });
    });

    // Update Staff Test
    describe('PUT /staff/:id', function() {
        it('should return a 400 when no staff ID is provided', async function() {
            const response = await supertest
                .put('/staff/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Name"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing staff ID
        });

        it('should update staff details successfully', async function() {
            const response = await supertest
                .put(`/staff/${staffId}`)
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Jane Doe",
                    role: "Senior Stylist"
                });
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.staff.name).to.equal("Updated Jane Doe");
            expect(response.body.staff.role).to.equal("Senior Stylist");
        });
    });

    // Delete Staff Test
    describe('DELETE /staff/:id', function() {
        it('should return a 400 when no staff ID is provided', async function() {
            const response = await supertest
                .delete('/staff/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Missing staff ID
        });

        it('should delete the staff with valid ID', async function() {
            const response = await supertest
                .delete(`/staff/${staffId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("Staff deleted successfully.");
        });
    });

    // Delete All Staff Test
    describe('DELETE /staff/', function() {
        it('should delete all staff', async function() {
            const response = await supertest
                .delete('/staff/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("All staff deleted successfully.");
        });
    });

});
