import { matchedData, validationResult } from "express-validator";
import { prisma } from '../lib/prisma';
import { supabase } from "../config/supabase";


export function renderNewFolderForm(req, res, next){
  res.render("createFolder", {
    title: "New Folder"
  });
}

export async function showFolder(req, res, next){
    try{
        const folder = req.folder ||
            await prisma.folder.findUnique({
                where: { id: Number(req.params.folderId) },
                include: {files: true}
            });

        if(!folder){
            return res.status(404).send("Folder not found");
        }
        return res.render("showFolder", {
            title: `${folder.name}`,
            folder
        });
    } catch (error){
        next(error);
    }
}

export function renderUpdateFolderForm(req, res, next){
        res.render("editFolder", {
            title: "Edit folder",
            folder: req.folder
        })
}


export async function createFolder(req, res, next){
    const errors = validationResult(req);
    const data = matchedData(req);

    if(!errors.isEmpty()){
        return res.status(400).render('newFolderForm',{
            title: "New Folder",
            errors,
            oldInput: data
        });
    }
    try{
        const folder = await prisma.folder.create({
            data:{
                name: data.name,
                ownerId: req.user.id
            },
        });

        return res.redirect(`/u/${req.user.id}`);
    } catch (error) {
        if(error.code === "P2002"){
            return res.status(400).render('newFolderForm', {
            errors: [{ msg: 'A folder with this name already exists.' }],
            oldInput: data
            });
        }
        return next(error);
    }
}

export async function updateFolder(req,res,next){

    const errors = validationResult(req);
    const data = matchedData(req);

    if(!errors.isEmpty()){
        return res.status(400).render("editFolder",{
            title: "Edit folder",
            errors,
            folder: req.folder,
            oldInput: data
        });
    }
    try{
        await prisma.folder.update({
            where: { id: req.folder.id},
            data: { name: data.name}
        });
        res.redirect(`/f/${req.folder.id}`);
    } catch(error){
        return next(error);
    }
}

export async function deleteFolder(req, res, next){
    try{

        await deleteAllFilesInFolder(req.folder.id);
        const deletedFolder = await prisma.folder.delete({
            where: {id: req.folder.id }
        });
        return res.redirect(`/u/${req.user.id}`);
    } catch (error){
        next(error);
    }
}


async function deleteAllFilesInFolder(folderId){
    const files = await prisma.file.findMany({
        where: {folderId},
        select: {id: true, storagePath: true}
    });

    const  paths = files.map(f => f.storagePath);
    
    if (paths.length > 0) {
        const {data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .remove(paths);

        if(error) throw error;
    }
    await prisma.file.deleteMany({
    where: { folderId }
    });
}