import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { supabase } from '../config/supabase';
export function renderUploadForm(req, res){
    res.render('uploadFileForm', {
        title: "Upload File",
        folderId: req.params.folderId
    });
}

export async function uploadFile(req, res, next){
    
    console.log(req.file);


    try{
        const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(
            `${req.params.folderId}/${req.file.name}`,
            req.file.buffer,
            {
            contentType: req.file.mimetype,
            cacheControl: '3600',
            upsert: false,
            }
    );

    if(error){
        console.log(error);
    }

        const {
            data: { publicUrl }
            } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(`${req.params.folderId}/${req.file.name}`
        );
        console.log("file is:",req.file);

        const file = await prisma.file.create({
            data:{
                name: req.file.name,
                originalName: req.file.originalname,
                size: req.file.size,
                ownerId: req.user.id,
                folderId: Number(req.params.folderId),
                url: publicUrl
            }
        });
        res.redirect(`/f/${req.params.folderId}`);
    } catch(error){
        next(error);
    }
}

export async function showFile(req, res, next){
    

    return res.render("showFile", {
        title: req.file.originalName,
        file: req.file
    })
}