import express from 'express';
import * as folderController from '../controllers/folderController';
import * as folderValidator from "../validators/folderValidator";
export const folderRouter = express.Router();

folderRouter.get('/new', folderController.renderNewFolderForm);
folderRouter.post('/new', folderValidator.createFolderValidator, folderController.createFolder);
folderRouter.get('/:id/edit', folderController.renderUpdateFolderForm);
folderRouter.post('/:id/edit', folderController.updateFolder);
folderRouter.post('/:id/delete', folderController.deleteFolder);
folderRouter.get('/:id', folderController.showFolder);
