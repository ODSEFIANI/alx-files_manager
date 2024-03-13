// worker.js

import Queue from 'bull';
import dbClient from './utils/db.js';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import imageThumbnail from 'image-thumbnail';

const fileQueue = new Queue('fileQueue');

fileQueue.process(async (job) => {
  try {
    const { userId, fileId } = job.data;

    // Validate job data
    if (!fileId) {
      throw new Error('Missing fileId');
    }
    if (!userId) {
      throw new Error('Missing userId');
    }

    // Retrieve file document from database
    const file = await dbClient.files.findOne({ _id: ObjectId(fileId), userId: ObjectId(userId) });
    if (!file) {
      throw new Error('File not found');
    }

    // Generate thumbnails
    const filePath = `${process.env.FOLDER_PATH || '/tmp/files_manager'}/${file.localPath}`;
    const thumbnail500 = await imageThumbnail(filePath, { width: 500 });
    const thumbnail250 = await imageThumbnail(filePath, { width: 250 });
    const thumbnail100 = await imageThumbnail(filePath, { width: 100 });

    // Save thumbnails to disk
    await Promise.all([
      fs.promises.writeFile(`${filePath}_500`, thumbnail500),
      fs.promises.writeFile(`${filePath}_250`, thumbnail250),
      fs.promises.writeFile(`${filePath}_100`, thumbnail100),
    ]);

    console.log(`Thumbnails generated for file ${fileId}`);
  } catch (error) {
    console.error(`Error processing job: ${error.message}`);
    throw error;
  }
});

console.log('Worker is running...');
