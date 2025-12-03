import { prisma } from '../../lib/prisma';

export async function ownsFolder(req, res, next){
    const folderId = Number(req.params.folderId);
    const folder = await prisma.folder.findUnique({
        where: {id: folderId},
        include: {files: true}
    });
    if (!folder) {
        return res.status(404).send("Folder not found");
    }
    if(req.user.id !== folder.ownerId){
        return res.status(403).send("Permission denited");
    }

    req.folder = folder;

    next();
}
