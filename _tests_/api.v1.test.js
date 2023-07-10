'use strict';

const { server } = require('../src/server');


const { db, users } = require('../src/models');
const supertest = require('supertest');
const mockRequest = supertest(server);


beforeAll(async connected => {
    await db.sync();
    await users.create({ username: 'moh', password: '123', role: 'admin' });
    connected();
});

afterAll(async done => {
    await db.drop();
    done();
})



describe('GET /:model', () => {
    it('should return a 200 status code', async () => {
        const response = await mockRequest.get('/api/v1/clothes');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /:model/:id', () => {
    it('should return a 200 status code', async () => {
        const response = await mockRequest.get('/api/v1/clothes/1');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /:model', () => {
    it('should return a 201 status code', async () => {
        const response = await mockRequest
            .post('/api/v1/food')
            .send({
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
                "userId": 1
            });
        expect(response.statusCode).toBe(201);
    });
});

describe('PUT /:model/:id', () => {
    it('should return a 203 status code', async () => {
        const response = await mockRequest
            .put('/api/v1/food/1')
            .send({
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
                "userId": 1
            });
        expect(response.statusCode).toBe(203);
    });
});

describe('DELETE /:model/:id', () => {
    it('should return a 204 status code', async () => {
        const response = await mockRequest.delete('/api/v1/clothes/1');
        expect(response.statusCode).toBe(204);
    });
});


