const {
    getMoviesDataPage
} = require('./../lib/pagination/actorMoviePagination')

const router = require('express').Router();

/* 
* The following route returns a paginated response of movies with their corresponding actors which have 
  been a review above a specifed rating.
*/

router.get('/rating/:movieRating', async (req, res) => {
    try {
        const moviesDataPage = await getMoviesDataPage(parseInt(req.query.page) || 1, req.params.movieRating);
        res.status(200).send(moviesDataPage);
    } catch (err) {
        console.error(err);
        res.status(500).send(error500);
    }
});

module.exports = router;