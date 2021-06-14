const router = require('express').Router();
const { MovieDb } = require('moviedb-promise');
const moviedb = new MovieDb('c7ac9277318b8c0f0f437c84fbc33bec');

router.post('/', async (req, res) => {
  const ans = await moviedb.movieInfo({id: req.body.movieid});
  const imdb = ans.imdb_id;
  console.log(ans);
  res.render('./singlemovie', {ans});
})

module.exports = router;