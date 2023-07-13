'use strict';

process.env.SECRET = "Anything";

const { server } = require('../src/server');
// Server containe the app from the server.js
require('dotenv').config();

const { db, users } = require('../src/models');
const jwt = require('jsonwebtoken');
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

let token

describe('POST  /signup', () => {
    it('should return a 201 status code', async () => {
        const response = await mockRequest
            .post('/signup')
            .send({
                "username": "ss",
                "password": "123",
                "role": "admin"
            });
        token = response.body.token;
        expect(response.statusCode).toBe(201);
        
    });
});

describe('POST to /signin to login as a user (use basic auth)', () => {
    it('should return a 200 status code when a valid username and password are provided', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('moh:123').toString('base64'));
        expect(response.status).toBe(200);
    });
});


describe('Routes vs test', () => {
    //token = jwt.sign({ username: 'moh' }, process.env.SECRET || 'Anything');

    it(' create a record ', async () => {
        const data = {
            name: 'mansaf',
            calories: 1000,
            type: 'protein',
        }

        const response = await mockRequest.post('/api/v2/food')
            .set({ authorization: `Bearer ${token}` })
            .send(data);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
    });

    it('get list of records', async () => {
        const response = await mockRequest.get('/api/v2/food')
            .set({ authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    })

    it(' return a 200 status code', async () => {
        const response = await mockRequest.get('/api/v2/food/1')
            .set({ authorization: `Bearer ${token}` });
        expect(response.statusCode).toBe(200);
    });


    it('return a 201 status code', async () => {
        const response = await mockRequest
            .post('/api/v2/food').set({ authorization: `Bearer ${token}` })
            .send({
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
            });
        expect(response.statusCode).toBe(201);
    });
    it('return a 203 status code', async () => {
        const response = await mockRequest
            .put('/api/v2/food/1').set({ authorization: `Bearer ${token}` })
            .send({
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
            })
        expect(response.statusCode).toBe(203);
    })
    it('return a 204 status code', async () => {
        const response = await mockRequest.delete('/api/v2/food/1').set({ authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(204);
    });
})
