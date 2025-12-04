import { body, param } from 'express-validator';
import { prisma } from '../lib/prisma';

 
const alphaErr = "must only contain letters or numbers.";
const lengthErr = "must be between 1 and 20 characters.";
const duplicateErr = "A folder with this name already exists"

export const createFolderValidator = [
    body('name')
    .isAlphanumeric().withMessage(`${alphaErr}`)
    .isLength({min: 1, max: 20}).withMessage(`${lengthErr}`)
    .custom( async (value, {req}) => {
        const isDuplicate = await prisma.folder.findUnique({
            where: { ownerId_name: {
                ownerId: req.user.id,
                name: value
            }}
        });
        if(isDuplicate){
            throw new Error(`${duplicateErr}`);
        }
        return true;
    }).withMessage(`${duplicateErr}`)
];

export const folderIdValidator = [
    param("folderId")
    .isInt({min: 1})
    .withMessage("Invalid folder ID")
    .toInt()
    
];