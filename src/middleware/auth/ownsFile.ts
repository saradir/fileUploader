import { prisma } from '../../lib/prisma';

export async function ownsFile(req, res, next){
    const fileId = Number(req.params.fileId);

    const file = await prisma.file.findUnique({
        where: {id: fileId}
    });
    if (!file) {
        return res.status(404).send("File not found");
    }
    if(req.user.id !== file.ownerId){
        return res.status(403).send("Permission denited");
    }
    
    req.file = file;

    next();
}
