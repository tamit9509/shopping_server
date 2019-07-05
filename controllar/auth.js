const { validationResult } = require('express-validator');
const User = require('../models/users');

exports.loginUser = (req, res) => {
    const credential = req.body;
    User.isValidUser(credential)

}

exports.registerUser = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
            return;
        }
        const user = new User(req.body);
        user.save((obj) => {
            if (obj) {
                res.send({
                    status: 200,
                    message: 'Successfully registered.',
                    data: obj
                });
                return;
            }
            res.status(409).send({
                message: 'Account already exist',
            });
        })
    } catch (error) { }
}