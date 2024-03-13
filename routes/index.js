// routes/index.js

import express from 'express';
import FilesController from '../controllers/FilesController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/files', AuthController.verifyToken, FilesController.postUpload);
router.get('/files/:id', AuthController.verifyToken, FilesController.getShow);
router.get('/files', AuthController.verifyToken, FilesController.getIndex);
router.put('/files/:id/publish', AuthController.verifyToken, FilesController.putPublish);
router.put('/files/:id/unpublish', AuthController.verifyToken, FilesController.putUnpublish);
router.get('/files/:id/data', AuthController.verifyToken, FilesController.getFile);

export default router;
