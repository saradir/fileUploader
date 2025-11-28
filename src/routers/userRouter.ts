import express from 'express';
import * as userController from '../controllers/userController';
import * as userValidator from '../validators/userValidator';

export const userRouter = express.Router();

userRouter.get('/signup', userController.renderSignupScreen);
userRouter.post('/signup', userValidator.signupValidator, userController.createUser);

