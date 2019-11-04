const {getMoviesDataPage} = require('./../lib/pagination/actorMoviePagination')

/* 
 * The following routes provide the following functionality:
    1. Search movies with a rating above a set value, and return both the movie name and the actors in it.
*/

const router = require('express').Router();

router.get('/rating/:movieRating', async (req, res) => {
    try {
      const moviesDataPage = await getMoviesDataPage(parseInt(req.query.page) || 1, req.params.movieRating );
      res.status(200).send(moviesDataPage);
    } catch (err) {
      console.error(err);
      res.status(500).send(error500);
    }
  });

module.exports = router;






