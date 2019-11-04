const mysqlPool = require('./../auxiliary/mysqlPool');

function getActorIDByName(actor) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT nconst FROM actors WHERE name = ?',
        [ actor ],
        (err, results) => {
          if (err || results == null) {
            reject(err);
          } else {
                resolve(results[0].nconst);
          }
        }
      );
    });
  }

  exports.getActorIDByName = getActorIDByName;

  function getMovieIDsByActorID(actorID) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT tconst FROM `movie-actors` WHERE nconst = ?',
        [ actorID ],
        (err, results) => {
          if (err) {
            reject(err);
          } 
          else {
            resolve(results);
          }
        }
      );
    });
  }

  exports.getMovieIDsByActorID = getMovieIDsByActorID;

  function getActorIDsByMovieID(movieID) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT nconst FROM movie-actors WHERE tconst = ?',
        [ movieID ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  exports.getActorIDsByMovieID = getActorIDsByMovieID;

  function getMovieTitlesByMovieIDs(movieIDs) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'SELECT title FROM movies WHERE tconst IN (?)',
        [ movieIDs ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  exports.getMovieTitlesByMovieIDs =  getMovieTitlesByMovieIDs;