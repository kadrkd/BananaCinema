const express = require('express');//Node -> express
const app = express();
const mongoose = require('mongoose'); // Node JS + MongoDB
const bodyParser = require('body-parser');  // json -> output
const verify = require('./routes/verifyToken');
const cookieParser = require('cookie-parser');
const {checkUser} = require('./checkuser');
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
app.get('*', checkUser);

app.get('/', (req, res) =>{
    res.render('./index');
});
app.get('/auth', (req, res) =>{
    res.render('./auth');
});
app.get('/movies', verify, (req, res) =>{
	if(res.locals.user.subscribed != null){
	if(res.locals.user.subscribed == true)
    	res.render('./movies');
	else
    	res.redirect('/subs');	
	}
	else{res.redirect('/subs');}
});
app.get('/profile',  verify, (req, res) =>{
	res.render('./profile');
});

app.get('/subs', verify, (req, res) =>{ 
    	res.render('./subs');   
});


app.get('/logout', (req, res) =>{ 
    res.clearCookie('auth');
    res.redirect('/');
});


//Routes

authRoute = require('./routes/auth');
app.use('/auth', authRoute);

subsRoute = require('./routes/subs');
app.use('/subs', subsRoute);

moviesRoute = require('./routes/movies');
app.use('/movies', moviesRoute);

singleMovieRoute = require('./routes/singlemovie');
app.use('/movies/movie', singleMovieRoute);


//Running Server on port 3000
app.listen(3000);
