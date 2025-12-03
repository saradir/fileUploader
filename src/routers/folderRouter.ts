import express from 'express';
import * as folderController from '../controllers/folderController';
import * as folderValidator from "../validators/folderValidator";
import { ownsFolder } from '../middleware/auth/ownsFolder';
import { fileRouter } from './fileRouter';
import { routeValidationHandler } from '../middleware/routeValidationHandler'; 
export const folderRouter = express.Router();


folderRouter.get('/new', folderController.renderNewFolderForm);
folderRouter.post('/new', folderValidator.createFolderValidator, folderController.createFolder);
folderRouter.get('/:folderId/edit', folderValidator.folderIdValidator, routeValidationHandler,  ownsFolder, folderController.renderUpdateFolderForm);
folderRouter.post('/:folderId/edit', folderValidator.folderIdValidator, routeValidationHandler, ownsFolder, folderValidator.createFolderValidator, folderController.updateFolder);
folderRouter.post('/:folderId/delete', folderValidator.folderIdValidator, routeValidationHandler, ownsFolder, folderController.deleteFolder);
folderRouter.use('/:folderId/file', folderValidator.folderIdValidator, routeValidationHandler, ownsFolder, fileRouter);
folderRouter.get('/:folderId', folderValidator.folderIdValidator, routeValidationHandler, ownsFolder, folderController.showFolder);
