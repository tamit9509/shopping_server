const http = require('http');
const express = require('express');
const routes = require('./routes');
const mongoconnect = require('./util/db').connection;
const app = express();

app.use((req, res, next) => {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});


app.use(express.static('public')); // use only if main file is at rootdirectory else use this ===>>>>> app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', (req, res, next) => {
//   console.log(req.body);
//   res.send('comming');
// })
// app.set('view engine', 'ejs');
// app.set('views', 'views');
app.use(routes.auth);
app.use('/admin', routes.admin);
app.use(routes.shope);
app.use((req, res) => {
	res.status(404).render('404', {
		pageTitle: 'Page not found',
		path: '/404'
	});
});
// app.use(mongoconnect);

app.listen(3000, () => {
	console.log('server started at 3000');
});
