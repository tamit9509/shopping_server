const { body } = require('express-validator')

exports.validate = method => {
    console.log(method);

    switch (method) {
        case 'registerUser':
            return [
                body('name').exists().withMessage('Name is required'),
                body('email').exists().withMessage('Name is required').isEmail().withMessage('Invalid Email address'),
                body('password').exists().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password minimum length should be 5'),
            ]
        case 'loginUser':
            return [
                body('email').exists().withMessage('Name is required').isEmail().withMessage('Invalid Email address'),
                body('password').exists().withMessage('Password is required')
            ]
    }
}
