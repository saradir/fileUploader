import { prisma } from '../lib/prisma';

export async function showSharedFolder(req, res, next){

    
    try{
        const folder = await prisma.folder.findUnique({
            where: {token: req.params.token},
            include: {files: true}

        });
         if(!folder){
            return res.status(404).render("404");
        }
        return res.render("showFolder", {
            title: `${folder.name}`,
            folder,
            permission: "read",
            fileUrl: (file) => `/share/f/${folder.token}/file/${file.id}`,
            uploadUrl: null,
            deleteFileUrl: () => null,
            deleteFolderUrl: null,
            shareLink: null

        });
    } catch (error){
        next(error);
    }
}
 
export async function showSharedFile(req, res, next){
    try{
        const file = await prisma.file.findFirst({
            where: { id: Number(req.params.fileId)}
        });

        if(!file){
            return res.status(404).render("404");
        }
    return res.render("showFile", {
        title: "File Information",
        file,

    })
    } catch(error){
        next(error);
    }
}