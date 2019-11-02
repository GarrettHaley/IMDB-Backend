
/* 
 * The following routes provide the following functionality:
    1. Search for names of actors in a given movie.
    2. Rate a movie on a 1-5 scale, with a comment.
*/
const router = require('express').Router();


router.get('/:titleName/actors', async (req, res) => {
    res.status(200).send(" Search for names of actors in a given movie");
});

router.post('/rate', async (req, res) => {
    res.status(200).send("Rate a movie on a 1-5 scale, with a comment");
});