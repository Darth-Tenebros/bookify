const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

describe('User Controller Tests', function() {

    let token, userId;

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

    // Create User Test
    describe('POST /users/', function() {
        it('should return a 400 when missing required fields', async function() {
            const response = await supertest
                .post('/users/')
                .set('Authorization', "Bearer " + token)
                .send({
                    // Missing name and email
                });
            
            expect(response.statusCode).to.be.equal(400);
            expect(response.body.message).to.equal("Name and email are required.");
        });

        it('should create a user with valid fields', async function() {
            const response = await supertest
                .post('/users/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Jane Doe",
                    email: "janedoe@example.com",
                    password: "securepassword"
                });
            
            expect(response.statusCode).to.be.equal(201);
            expect(response.body.message).to.equal("User created successfully.");
            userId = response.body.user._id;  // Store the user ID for future tests
        });
    });

    // Get All Users Test
    describe('GET /users/', function() {
        it('should return a 200 with valid token', async function() {
            const response = await supertest
                .get('/users/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.users).to.be.an('array');
        });

        it('should return a 403 without token', async function() {
            const response = await supertest
                .get('/users/');
            
            expect(response.statusCode).to.be.equal(403);
        });
    });

    // Get User By ID Test
    describe('GET /users/:id', function() {
        it('should return a 400 when user ID is missing', async function() {
            const response = await supertest
                .get('/users/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Endpoint expects an ID
        });

        it('should return a 200 with valid ID', async function() {
            const response = await supertest
                .get(`/users/${userId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.user).to.have.property('_id', userId);
        });
    });

    // Update User Test
    describe('PUT /users/:id', function() {
        it('should return a 400 when no user ID is provided', async function() {
            const response = await supertest
                .put('/users/')
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Name"
                });
            
            expect(response.statusCode).to.be.equal(404);  // Missing user ID
        });

        it('should update user details successfully', async function() {
            const response = await supertest
                .put(`/users/${userId}`)
                .set('Authorization', "Bearer " + token)
                .send({
                    name: "Updated Jane Doe",
                    email: "updatedjanedoe@example.com"
                });
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.user.name).to.equal("Updated Jane Doe");
            expect(response.body.user.email).to.equal("updatedjanedoe@example.com");
        });
    });

    // Delete User Test
    describe('DELETE /users/:id', function() {
        it('should return a 400 when no user ID is provided', async function() {
            const response = await supertest
                .delete('/users/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(404);  // Missing user ID
        });

        it('should delete the user with valid ID', async function() {
            const response = await supertest
                .delete(`/users/${userId}`)
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("User deleted successfully.");
        });
    });

    // Delete All Users Test
    describe('DELETE /users/', function() {
        it('should delete all users', async function() {
            const response = await supertest
                .delete('/users/')
                .set('Authorization', "Bearer " + token);
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.message).to.equal("All users deleted successfully.");
        });
    });

});
