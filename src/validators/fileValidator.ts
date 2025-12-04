import { body, param } from 'express-validator';

const MAX_SIZE = 2;
const ALLOWED_TYPES = ["png", "jpeg", "pdf", "gif"];

export const fileValidator = [
    body()
    
    .custom((_, { req }) => {
        if(req.file.size > MAX_SIZE){
            throw new Error(`File must be less than ${MAX_SIZE} MB`)
        }
        return true;
    })

    .custom((_, { req }) => {
        if(!ALLOWED_TYPES.includes(req.file.mimetype) ){
            throw new Error("Invalid file type");
        }
        return true;
    })
]