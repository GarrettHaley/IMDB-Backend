const mysqlPool = require('./../auxiliary/mysqlPool');


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