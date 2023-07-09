const request = require('supertest');
const express = require('express');
const authMiddleware = require('./authMiddleware');

// Create a mock server
const app = express();
app.use(authMiddleware);

describe('Authentication Middleware', () => {
    it('should return 401 if authorization header is missing', async () => {
        const response = await request(app)
            .get('/')
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(401);
        expect(response.text).toBe('Invalid Login');
    });


});
