// redisClient.test.js

import redisClient from '../utils/redisClient';

describe('Redis Client', () => {
  test('Set and Get', async () => {
    await redisClient.set('test_key', 'test_value');
    const value = await redisClient.get('test_key');
    expect(value).toBe('test_value');
  });
  // Add more tests for other Redis operations as needed
});
