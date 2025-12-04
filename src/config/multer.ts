import multer from "multer";


const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",      
  "image/png",
  "image/gif",
  "application/pdf"
];
const fileFilter = (req, file, cb) => {
    // Check file type
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type'), false); // Reject file
    }


};

export const upload = multer({
     storage: multer.memoryStorage(),
     fileFilter: fileFilter,
     limits: { fileSize: 2 * 1024 * 1024 } 
    });

    
