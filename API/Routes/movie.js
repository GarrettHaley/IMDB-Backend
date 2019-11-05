const {
  error500,
  error400
} = require('./../lib/auxiliary/errorObjects');
const {
  validateAgainstSchema,
  extractValidFields
} = require('./../lib/auxiliary/validation');
const {
  reviewInputSchema,
  reviewSchema
} = require('./../lib/models/reviewSchema');
const {
  getActorsPage
} = require('./../lib/pagination/actorsPagination');
const {
  insertNewReview
} = require('./../lib/sqlQueries/reviewQueries');
const {
  getMovieIDByTitle
} = require('../lib/sqlQueries/movieActorQueries');
/* 
* The following route provide the following functionality:
  1. Search for names of actors in a given movie.
  2. Rate a movie on a 1-5 scale, with a comment.
*/
const router = require('express').Router();

router.get('/:movie/actors', async (req, res) => {
  try {
      const actorsPage = await getActorsPage(parseInt(req.query.page) || 1, req.params.movie);
      res.status(200).send(actorsPage);
  } catch (err) {
      console.error(err);
      res.status(500).send(error500);
  }
});

router.post('/rate', async (req, res) => {
  if (validateAgainstSchema(req.body, reviewInputSchema)){
    try{
      const tconst = await getMovieIDByTitle(req.body.title);
      req.body.tconst = tconst;
      const validReview = extractValidFields(req.body, reviewSchema);
      await insertNewReview(validReview);
      res.status(201).send({msg: "Review was successfully inserted"});
    } catch (err){
      console.log(err);
      res.status(500).send(error500);
    }
  }
    else {
      res.status(400).send(error400);
      
  }
});

module.exports = router;
