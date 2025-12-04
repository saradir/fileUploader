import express from 'express';
import * as userController from '../controllers/userController';
import * as userValidator from '../validators/userValidator';
import { ensureAuth } from "../middleware/auth/ensureAuth";
import { ownsProfile } from '../middleware/auth/ownsProfile';

export const userRouter = express.Router();

userRouter.get('/signup', userController.renderSignupScreen);
userRouter.post('/signup', userValidator.signupValidator, userController.createUser);

userRouter.get('/signin', userController.renderSigninForm);
userRouter.post('/signin', userValidator.signinValidator, userController.signin );
userRouter.get('/signout', userController.signout);
userRouter.get('/:id', ensureAuth, ownsProfile, userController.showProfile);
