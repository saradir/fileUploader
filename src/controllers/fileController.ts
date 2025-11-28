import { prisma } from '../lib/prisma';

export function renderUploadForm(req, res){
    res.render('uploadFileForm', {
        title: "Upload File"
    });
}

export async function uploadFile(req, res){
    console.log(req.file);

    res.send('success');
}