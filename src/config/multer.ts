import multer from "multer";




const fileFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/gif') {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type'), false); // Reject file
    }
};

export const upload = multer({
     storage: multer.memoryStorage(),
     fileFilter: fileFilter
    });

    
