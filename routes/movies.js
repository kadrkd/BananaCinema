const router = require('express').Router();
const { MovieDb } = require('moviedb-promise');
const moviedb = new MovieDb('c7ac9277318b8c0f0f437c84fbc33bec');


router.post('/', async (req, res) => {
	const ans = await moviedb.searchMovie(req.body.movie_name);
	// console.log(ans.results);
	res.render('./movies', {ans});
});


module.exports=router;