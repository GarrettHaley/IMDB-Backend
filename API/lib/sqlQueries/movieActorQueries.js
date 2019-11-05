const mysqlPool = require('./../auxiliary/mysqlPool');

/* 
* The following function attempts to select a movies ID given its name.
*/

  function getMovieIDByTitle(movieID) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT tconst FROM `movies` m WHERE upper(m.title) = ?',
        [ movieID ],
        (err, results) => {
          if (err || results == null) {
            reject(err);
          } else {
              resolve(results[0].tconst);
          }
        }
      );
    });
  }

  exports.getMovieIDByTitle = getMovieIDByTitle;

/* 
* The following function attempts to select all movies an actor has been in.
*/
  
  function getMoviesByActor(actor) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT title FROM `movies` m JOIN `movie-actors` ma ON m.tconst = ma.tconst JOIN `actors` a ON ma.nconst = a.nconst WHERE upper(a.name) = ?',
        [ actor ],
        (err, results) => {
          if (err || results == null) {
            reject(err);
          } else {
                resolve(results);
          }
        }
      );
    });
  }

  exports.getMoviesByActor = getMoviesByActor;

/* 
* The following function attempts to select all actor names given the movie title.
*/

  function getActorsByMovie(movie) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT name FROM `actors` a JOIN `movie-actors` ma ON a.nconst = ma.nconst JOIN `movies` m ON ma.tconst = m.tconst WHERE upper(m.title) = ?',
        [ movie ],
        (err, results) => {
          if (err || results == null) {
            reject(err);
          } else {
                resolve(results);
          }
        }
      );
    });
  }
  exports.getActorsByMovie = getActorsByMovie;

/* 
* The following function attempts to select movie titles where the movie has been reviewed above a specified value.
*/

  function getMovieDataAboveReview(reviewValue, offset, pageSize) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT m.title FROM `movies` m JOIN `reviews` r ON m.tconst = r.tconst WHERE r.rating > ? LIMIT ?,? ',
        [ reviewValue, offset, pageSize ],
        (err, results) => {
          if (err || results == null) {
            reject(err);
          } else {
                resolve(results);
          }
        }
      );
    });
  }
  exports.getMovieDataAboveReview = getMovieDataAboveReview;

/* 
* The following function attempts to count the number of movie titles that have been reviewed above a specified value.
*/

  function getMovieDataAboveReviewCount(reviewValue) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT COUNT(*) AS count FROM `movies` m JOIN `reviews` r ON m.tconst = r.tconst WHERE r.rating > ? ',
        [ reviewValue ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0].count);
          }
        }
      );
    });
  }
  exports.getMovieDataAboveReviewCount = getMovieDataAboveReviewCount;