const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getNowYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFileSync('server.log', log + '\n');
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Desi'
	});
});
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		welcomeMessage: 'Desi About'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects Page',
		welcomeMessage: 'Desi Projects',
		currentYear: new Date()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'DESI POSO'
	});
});
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});