const supertest= require('supertest');
const { server } = require('../src/server');
const mockServer = supertest(server);

describe("Server test", () => {
    it("Server it eork fine", async () => {
        const response = await mockServer.get('/');
        expect(response.status).toBe(200);
    })
  it('should return 404 for a bad route', async () => {
  const response = await mockServer.get('/bad-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sorry, we could not find what you were looking for');
  });
  it('should return 404 for a bad method', async () => {
  const response = await mockServer.put('/singup');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sorry, we could not find what you were looking for');
});
  });
