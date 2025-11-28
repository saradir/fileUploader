import { matchedData, validationResult } from "express-validator";
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export function renderSignupScreen(req, res){
    res.render('signupForm', {
        title: "Sign Up"
    });
}

export async function createUser(req, res, next){
    const data = matchedData(req);
    console.log("matched data:", data);

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