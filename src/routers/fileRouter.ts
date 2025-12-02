import express from 'express';
import * as fileController from '../controllers/fileController';
import multer from "multer";
import { ownsFile } from '../middleware/auth/ownsFile';

const upload = multer({ storage: multer.memoryStorage()});


export const fileRouter = express.Router({ mergeParams: true });

fileRouter.get('/upload', fileController.renderUploadForm);
fileRouter.post('/upload', upload.single('file'), fileController.uploadFile);
fileRouter.get('/:fileId', ownsFile, fileController.showFile);