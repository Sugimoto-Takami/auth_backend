// backend/src/middleware/validation.ts
import { check } from 'express-validator'

const registerValidationRules = () => {
    return [
        check('name').not().isEmpty().withMessage('Name cannot be empty'),
        check('email').isEmail().withMessage('Must be a valid email address'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ];
};

const loginValidationRules = () => {
    return [
        check('email').isEmail().withMessage('Must be a valid email address'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ];
};

export {
    registerValidationRules,
    loginValidationRules
}