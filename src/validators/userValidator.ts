import { body } from 'express-validator';

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";

export const signupValidator = [

  body('name')
    .trim()
    .isAlpha().withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 20 }).withMessage(`First name ${lengthErr}`),

  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Password must have at least 4 characters'),

  body('password2').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const signinValidator = [
    body('email')
    .trim()
    .isEmail(),

    body('password').notEmpty()
]
