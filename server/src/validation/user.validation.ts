import { body } from "express-validator";

const validateUpdateUserRequest = () => {
    return [
        body('email', 'Invalid email').optional().isEmail(),
        body('username', 'Invalid username').optional().isString(),
        body('gender', 'Invalid gender').optional().isIn(['MALE', 'FEMALE']),
        body('age', 'Invalid age').optional().isNumeric(),
        body('password', 'Password should be at least 7 chars long').optional().isLength({ min: 7 })
    ];
};

export default validateUpdateUserRequest;