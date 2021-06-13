const router = require('express').Router();
const Film = require('../model/Film');
var unirest = require("unirest");

var req = unirest("GET", "https://imdb8.p.rapidapi.com/title/find");

req.query({
	"q": "world"
});

req.headers({
	"x-rapidapi-key": "b1fb376f44mshc2976bdc9502697p1b4e0cjsnd9077815dafc",
	"x-rapidapi-host": "imdb8.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	// console.log(res.body);
});

module.exports = router;

