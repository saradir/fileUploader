import express from 'express';
import * as shareController from '../controllers/shareController';
export const shareRouter = express.Router();


shareRouter.get('/f/:token', shareController.showSharedFolder );
shareRouter.get('/f/:token/file/:fileId', shareController.showSharedFile);