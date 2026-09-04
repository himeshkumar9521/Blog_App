const {body} = require('express-validator');

const registerValidation = [
    body('userName')
    .notEmpty()
    .withMessage('userName required'),

    body('email')
    .isEmail()
    .withMessage('Email required'),

    body('passWord')
    .isLength({min:8})
    .withMessage('password should contain atleast 8 character')

    .matches(/[A-Z]/)
    .withMessage('password must contain uppercase letter')

    .matches(/[a-z]/)
    .withMessage(
        'Password must contain lowercase letter'
    )

    .matches(/[0-9]/)
    .withMessage(
        'Password must contain number'
    )

    .matches(/[!@#$%^&*]/)
    .withMessage(
        'Password must contain special character'
    )
];

module.exports = {registerValidation};