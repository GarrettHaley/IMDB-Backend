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