import multer from "multer";
import { upload } from "../config/multer";

export function uploadFile(req, res, next) {
    upload.single("file")(req, res, function (err){
        if(err){
            return res.status(400).render("uploadFileForm", {
                title: "Upload File",
                errors: [{msg: err.message}],
                folderId: Number(req.params.folderId)
            });
        }
        next()
    })
}