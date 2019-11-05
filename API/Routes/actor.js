const {
  error500
} = require('./../lib/auxiliary/errorObjects');
const {
  getMoviesPage
} = require('./../lib/pagination/moviesPagination')
/* 
* The following routes provide the following functionality:
  1. Search for names of movies an actor has appeared in.

  Fetches page info, generates HATEOAS links for surrounding pages.
*/

const router = require('express').Router();

router.get('/:actor/movies', async (req, res) => {
  try {
      const moviesPage = await getMoviesPage(parseInt(req.query.page) || 1, req.params.actor);
      res.status(200).send(moviesPage);
  } catch (err) {
      console.error(err);
      res.status(500).send(error500);
  }
});

module.exports = router;