import express from 'express';
import * as fileController from '../controllers/fileController';
import multer from "multer";

const upload = multer({ dest: "uploads/" });


export const fileRouter = express.Router();

fileRouter.get('/upload', fileController.renderUploadForm);
fileRouter.post('/upload', upload.single('file'), fileController.uploadFile);