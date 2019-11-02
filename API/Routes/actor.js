/* 
 * The following routes provide the following functionality:
    1. Search for names of movies an actor has appeared in.
*/

const router = require('express').Router();

router.get('/:actor/movies', async (req, res) => {
    res.status(200).send("Search for names of movies an actor has appeared in");
});

module.exports = router;