import { body } from "express-validator/check";

const validate = () => {
    return [
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'Password should be at least 7 chars long').exists().isLength({ min: 7 })
    ];
};

export default validate;