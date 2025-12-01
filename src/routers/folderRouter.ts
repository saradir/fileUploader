import express from 'express';
import * as folderController from '../controllers/folderController';
import * as folderValidator from "../validators/folderValidator";
import { ownsFolder } from '../middleware/auth/ownsFolder';
export const folderRouter = express.Router();


folderRouter.get('/new', folderController.renderNewFolderForm);
folderRouter.post('/new', folderValidator.createFolderValidator, folderController.createFolder);
folderRouter.get('/:folderId/edit', ownsFolder, folderController.renderUpdateFolderForm);
folderRouter.post('/:folderId/edit', ownsFolder, folderValidator.createFolderValidator, folderController.updateFolder);
folderRouter.post('/:folderId/delete', ownsFolder, folderController.deleteFolder);
folderRouter.get('/:folderId', ownsFolder, folderController.showFolder);
