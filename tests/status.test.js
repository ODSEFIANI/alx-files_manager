// status.test.js

import request from 'supertest';
import app from '../app'; // Import your Express app

describe('GET /status', () => {
  test('It should respond with status 200', async () => {
    const response = await request(app).get('/status');
    expect(response.statusCode).toBe(200);
  });
  // Add more tests for other status-related scenarios
});
