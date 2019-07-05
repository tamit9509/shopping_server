const { body } = require('express-validator')

exports.validate = method => {
    switch (method) {
        case 'registerUser':
            return [
                body('name').exists(),
                body('email').exists('Email is required').isEmail('Invalid email'),
                body('password').exists('Password is required').isLength({ min: 5 }).withMessage('Password minimum length should be 5'),
            ]
    }
}
