// dbClient.test.js

import dbClient from '../utils/dbClient';

describe('Database Client', () => {
  test('Find User by Email', async () => {
    const user = await dbClient.users.findByEmail('test@example.com');
    expect(user.email).toBe('test@example.com');
  });
  // Add more tests for other database operations as needed
});
