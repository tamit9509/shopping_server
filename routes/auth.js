const express = require('express');
const bodyParser = require('body-parser');
const validation = require('../feild-validate/validate')
const authControllar = require('../controllar/auth');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post('/register', validation.validate('registerUser'), authControllar.registerUser);
router.post('/login', validation.validate('loginUser'), authControllar.loginUser);
module.exports = router;
