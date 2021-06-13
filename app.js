const express = require('express');//Node -> express
const app = express();
const mongoose = require('mongoose'); // Node JS + MongoDB
const bodyParser = require('body-parser');  // json -> output
const verify = require('./routes/verifyToken');
const cookieParser = require('cookie-parser');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

//console.log(checker(req, res));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });
require('dotenv/config');// Passwords


//Connection to online DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true }, () =>{  
    console.log('Connected to db');
});
app.set('view engine', 'ejs'); // html -> dynamic ejs
app.set('views', 'views');

app.use('/', express.static(__dirname +"/public"));

//EJS Rendering
app.get('/', (req, res) =>{
    res.render('./index', {check: !!req.cookies.auth});
});
app.get('/auth', (req, res) =>{
    res.render('./auth', {check: !!req.cookies.auth});
});
app.get('/movies', (req, res) =>{
    res.render('./movies', {check: !!req.cookies.auth});
});
app.get('/profile',  verify, (req, res) =>{
	res.render('./profile', {check: !!req.cookies.auth});
});

app.get('/subs', (req, res) =>{ 
    res.render('./subs', {check: !!req.cookies.auth});
});

app.get('/logout', (req, res) =>{ 
    res.clearCookie('auth');
    res.redirect('/');
});

//Routes
authRoute = require('./routes/auth');
app.use('/auth', authRoute);

moviesRoute = require('./routes/movies');
app.use('/movies', moviesRoute);


//Running Server on port 3000
app.listen(3000);
