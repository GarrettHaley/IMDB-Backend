
/* 
 * The following routes provide the following functionality:
    1. Search movies with a rating above a set value, and return both the movie name and the actors in it.
*/

const router = require('express').Router();

router.get('/rating/:movieRating', async (req, res) => {
    res.status(200).send("Search movies with a rating above a set value, and return both the movie name and the actors in it");
});

module.exports = router;






