import { matchedData, validationResult } from "express-validator";
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export function renderSignupScreen(req, res){
    res.render('signupForm', {
        title: "Sign Up"
    });
}

export function renderSigninForm(req, res){
    res.render('signinForm', {
        title: "Sign In"
    });
}

export async function createUser(req, res, next){
    const data = matchedData(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render("signupForm", {
        errors: errors.array(),
        oldInput: data 
    });
    }
    
    try{
        
        const hashedPass =  await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
        data: {
        name: data.name,
        email: data.email,
        password: hashedPass
        },
        });
        console.log('Created user:', user)
        res.redirect('/');
    } catch (err){
        console.error('Create user failed:', err);
        next(err);

    }
}

export async function signin(req, res, next){
        const data = matchedData(req);
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).render("signinForm", {
            errors: errors.array(),
            oldInput: data 
        });
    }
    try{
        const user = await prisma.user.findUnique({
            where: {email: data.email}
        });

        if (!user) {
            return res.status(400).render("signinForm", {
                errors: [{ msg: "Invalid email or password" }]
            });
            }
        
        const match = await bcrypt.compare(data.password, user.password);

        if(!match){
                return res.status(400).render("signinForm", {
                errors: [{ msg: "Invalid email or password" }]
            });
            }
        req.login(user, err => {
        if (err) return next(err);
        return res.redirect(`/u/${user.id}`);
            });
        } catch (err){
            next(err);
        }
}

export async function showProfile(req, res, next){
    try{
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({
            where: {id}
        });
        const folders = await prisma.folder.findMany({ select: { id:true, name: true}});
        res.render('profile', {
            title: `${req.user.name}'s Profile`,
            folders
        });
    } catch (error){
        next(error);
    }

}

export async function signout(req, res, next) {
    req.logout(function(err) {
        if(err) return next(err);
        res.redirect('/');
    });
    
}