const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('User Controller Tests', function() {

    let userId;

    describe('POST /users/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/api/users/')
                .send({
                    
                });
            
            expect(response.statusCode).to.be.equal(400);
        });

        // commented out due to unique constraint on email
        it('should create a user with valid fields', async function() {
            const response = await supertest
                .post('/api/users/')
                .send({
                    name: "Jane Doe",
                    email: "janedoess@example.com",
                    password: "securepassword",
                    role: 'customer'
                });
            
            expect(response.statusCode).to.be.equal(201);
            userId = response.body.user._id;
        });
    });

    describe('GET /users/', function() {
        it('should return a 200 with valid request', async function() {
            const response = await supertest
                .get('/api/users/all');
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    
    describe('GET /users/:id', function() {
        it('should return a 400 when user ID is missing', async function() {
            const response = await supertest
                .get('/api/users/');
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should return a 200 with valid ID', async function() {
            // userId = '66e87c27b50c9f1e2a1d115d';
            const response = await supertest
                .get(`/api/users/${userId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('PUT /users/:id', function() {
        it('should return a 400 when no user ID is provided', async function() {
            const response = await supertest
                .put('/api/users/')
                .send({
                    name: "Updated Name"
                });
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should update user details successfully', async function() {
            const response = await supertest
                .put(`/api/users/${userId}`)
                .send({
                    name: "Updated Jane Doe",
                    email: "updatedjanedoe@example.com"
                });
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    describe('DELETE /users/:id', function() {
        it('should return a 400 when no user ID is provided', async function() {
            const response = await supertest
                .delete('/api/users/');
            
            expect(response.statusCode).to.be.equal(404);
        });

        it('should delete the user with valid ID', async function() {
            const response = await supertest
                .delete(`/api/users/${userId}`);
            
            expect(response.statusCode).to.be.equal(200);
        });
    });

    
    // describe('DELETE /users/', function() {
    //     it('should delete all users', async function() {
    //         const response = await supertest
    //             .delete('/api/users/');
            
    //         expect(response.statusCode).to.be.equal(200);
    //         expect(response.body.message).to.equal("All users deleted successfully.");
    //     });
    // });

});
