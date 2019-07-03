const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./../util/path');
const RegisterUsers = require('./../models/users');
const router = express.Router();

router.use(
	bodyParser.urlencoded({
		extended: true
	})
);

router.post('/login', login);
router.get('/login', (req, res) => {
	res.sendFile(path.join(rootDir, 'view', 'login.html'));
});

router.post('/register', regiserUser);

router.get('/register', (req, res) => {
	res.sendFile(path.join(rootDir, 'view', 'register.html'));
});

function regiserUser(req, res) {
	const user = new RegisterUsers(req.body);
	res.send(user.save());
}

function login(req, res) {
	let data = req.body;
	if (data.email === 'admin@gmail.com' && data.password === '123456') {
		res.status(200).send('login success');
		return;
	}
	res.send('login unsuccess');
}

module.exports = router;
