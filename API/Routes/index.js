/* 
 * Acts as the router for the IMDB RESET API.
*/

const router = require('express').Router();

router.use('/actor', require('./actor'));
router.use('/movie', require('./movie'));
router.use('/movies', require('./movies'));
router.use('', require('./errors'));

module.exports = router;
