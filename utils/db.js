// db.js

import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT || 27017;
        this.database = process.env.DB_DATABASE || 'files_manager';

        const url = `mongodb://${this.host}:${this.port}`;
        this.client = new MongoClient(url, { useUnifiedTopology: true });

        this.client.connect((err) => {
            if (err) {
                console.error('DB Connection Error:', err);
            } else {
                console.log('Connected to MongoDB');
            }
        });
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const db = this.client.db(this.database);
        const usersCollection = db.collection('users');
        return usersCollection.countDocuments();
    }

    async nbFiles() {
        const db = this.client.db(this.database);
        const filesCollection = db.collection('files');
        return filesCollection.countDocuments();
    }
}

const dbClient = new DBClient();

export default dbClient;
