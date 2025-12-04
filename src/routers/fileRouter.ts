import express from 'express';
import * as fileController from '../controllers/fileController';
import { uploadFile } from "../middleware/uploadFile";
import { ownsFile } from '../middleware/auth/ownsFile';



export const fileRouter = express.Router({ mergeParams: true });

fileRouter.get('/upload', fileController.renderUploadForm);
fileRouter.post("/upload", uploadFile, fileController.uploadFile);
fileRouter.post('/:fileId/delete', ownsFile, fileController.deleteFile);
fileRouter.get('/:fileId', ownsFile, fileController.showFile);