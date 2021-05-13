const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

require('dotenv/config');
var path = require('path');
var serveStatic = require('serve-static');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')))

//Connection to online DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true }, () =>{  
    console.log('Connected to db');
})

authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

searchRoute = require('./routes/search');
app.use('/api/films', searchRoute);


app.listen(3000);