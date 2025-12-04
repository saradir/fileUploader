import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { supabase } from '../config/supabase';
import * as crypto from 'node:crypto'; // this is used to give unique id's to file uploads


export function renderUploadForm(req, res){
    res.render('uploadFileForm', {
        title: "Upload File",
        folderId: req.params.folderId
    });
}

export async function uploadFile(req, res, next){
    
    if (!req.file){
        return res.status(400).send("No file uploaded");

    }
    const uploadId = crypto.randomUUID();
    try{
        const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(
            `${req.params.folderId}/${uploadId}`,
            req.file.buffer,
            {
            contentType: req.file.mimetype,
            cacheControl: '3600',
            upsert: false,
            }
    );

    if(error){
        return next(error);
    }

        const {
            data: { publicUrl }
            } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(`${req.params.folderId}/${uploadId}`
        );

        if (!publicUrl) return next(new Error("Could not generate public URL"));


        const file = await prisma.file.create({
            data:{
                originalName: req.file.originalname,
                size: req.file.size,
                ownerId: req.user.id,
                folderId: Number(req.params.folderId),
                url: publicUrl,
                storagePath: `${req.params.folderId}/${uploadId}`
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

export async function deleteFile(req, res, next){
    try{
        const {data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .remove([req.file.storagePath]);

        if(error){
            return next(error);
        }
        const deletedFile = await prisma.file.delete({
            where:{id: req.file.id}
        });
        
        res.redirect(`/f/${req.params.folderId}`);
    } catch (error){
        next(error);
    }
}