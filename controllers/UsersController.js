// controllers/UsersController.js

import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import sha1 from 'sha1';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await dbClient.client.db().collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const result = await dbClient.client.db().collection('users').insertOne({ email, password: hashedPassword });
    const newUser = { id: result.insertedId, email };

    res.status(201).json(newUser);
  }
}

export default UsersController;
