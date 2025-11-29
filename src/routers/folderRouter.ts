import express from 'express';
import * as folderController from '../controllers/folderController';

export const folderRouter = express.Router();

folderRouter.get('/new', folderController.renderNewFolderForm);
folderRouter.post('/new', folderController.createNewFolder);
folderRouter.get('/:id/edit', folderController.renderUpdateFolderForm);
folderRouter.post('/:id/edit', folderController.updateFolder);
folderRouter.post('/:id/delete', folderController.deleteFolder);
folderRouter.get('/:id', folderController.showFolder);
