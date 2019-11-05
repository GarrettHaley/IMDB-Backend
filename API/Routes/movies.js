const {
    getMoviesDataPage
} = require('./../lib/pagination/actorMoviePagination')

const {
    error400
} = require('./../lib/auxiliary/errorObjects')

const router = require('express').Router();

/* 
* The following route returns a paginated response of movies with their corresponding actors which have 
  been a review above a specifed rating.
*/

router.get('/rating/:movieRating', async (req, res) => {
    if(parseInt(req.params.movieRating) <= 5 && parseInt(req.params.movieRating) > 0){
        try {
            const moviesDataPage = await getMoviesDataPage(parseInt(req.query.page) || 1, req.params.movieRating);
            res.status(200).send(moviesDataPage);
        }   catch (err) {
                console.error(err);
                res.status(500).send(error500);
            }
    }
    else{
        res.status(400).send(error400);
    }
});

module.exports = router;