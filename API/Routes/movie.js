const { error500 } = require('./../lib/auxiliary/errorObjects');
const {getActorsPage} = require('./../lib/pagination/actorsPagination')
/* 
 * The following routes provide the following functionality:
    1. Search for names of actors in a given movie.
    2. Rate a movie on a 1-5 scale, with a comment.
*/
const router = require('express').Router();

router.get('/:movie/actors', async (req, res) => {
  try {
    const actorsPage = await getActorsPage(parseInt(req.query.page) || 1, req.params.movie );
    res.status(200).send(actorsPage);
  } catch (err) {
      console.error(err);
      res.status(500).send(error500);
    }
});

router.post('/rate', async (req, res) => {
    res.status(200).send("Rate a movie on a 1-5 scale, with a comment");
});

module.exports = router;