const { error404 } = require('./../lib/auxiliary/errorObjects');
const { error500 } = require('./../lib/auxiliary/errorObjects');
const {getMoviesPage} = require('./../lib/auxiliary/pagination')
/* 
 * The following routes provide the following functionality:
    1. Search for names of movies an actor has appeared in.

    Fetches page info, generates HATEOAS links for surrounding pages.
*/

const router = require('express').Router();

router.get('/:actor/movies', async (req, res) => {
    try {
      const moviesPage = await getMoviesPage(parseInt(req.query.page) || 1, req.params.actor );
      console.log(moviesPage,"LOOK HEREEEE!!!");
      if(moviesPage == null)
        res.status(404).send(error404);
      res.status(200).send(moviesPage);
    } catch (err) {
      console.error(err);
      res.status(500).send(error500);
    }
  });

module.exports = router;