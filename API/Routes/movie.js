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

const router = require('express').Router();

/* 
* The following route gets a movie title and generates a list of actors in a paginated response.
*/

router.get('/:movie/actors', async (req, res) => {
  try {
      const actorsPage = await getActorsPage(parseInt(req.query.page) || 1, req.params.movie);
      res.status(200).send(actorsPage);
  } catch (err) {
      console.error(err);
      res.status(500).send(error500);
  }
});

/* 
* The following route performs basic evaluation on request, extracts desired data from the request,
   and inserts that data as a review to the reviews table.
*/

router.post('/rate', async (req, res) => {
  if (validateAgainstSchema(req.body, reviewInputSchema) && parseInt(req.body.rating) <= 5 && parseInt(req.body.rating) > 0){
    try{
      const tconst = await getMovieIDByTitle(req.body.title);
      req.body.tconst = tconst;
      const validReview = extractValidFields(req.body, reviewSchema);
      await insertNewReview(validReview);
      res.status(201).send({
        "success": {
         "successes": [
          {
           "reason": "review inserted",
           "message": "The review has been inserted into the database."
          }
         ],
         "code": 201,
         "message": "Review insertion was successful."
         }
        });
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
