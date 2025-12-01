import { prisma } from '../lib/prisma';

export function renderUploadForm(req, res){
    res.render('uploadFileForm', {
        title: "Upload File",
        folderId: req.params.folderId
    });
}

export async function uploadFile(req, res, next){
    console.log(req.file);

    try{
        const file = await prisma.file.create({
            data:{
                name: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                ownerId: req.user.id,
                folderId: Number(req.params.folderId),
                url: req.file.path
            }
        });
        res.redirect(`/f/${req.params.folderId}`);
    } catch(error){
        next(error);
    }
}

export async function showFile(req, res, next){
    console.log(req.file);
    return res.render("showFile", {
        title: req.file.originalName,
        file: req.file
    })
}