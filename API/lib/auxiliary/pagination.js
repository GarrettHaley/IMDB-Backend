const { getActorIDByName } = require('./../sqlQueries/movieActorQueries');
const { getMovieIDByTitle } = require('./../sqlQueries/movieActorQueries');
const { getMovieIDsByActorID } = require('./../sqlQueries/movieActorQueries');
const { getMovieTitlesByMovieIDs } = require('./../sqlQueries/movieActorQueries');

getMoviesByActor = async function(actor){
    const actorID = await getActorIDByName(actor);
    var movieIDs = await getMovieIDsByActorID(actorID);
    if(movieIDs.length > 1){
        movieIDs = movieIDs.map(function(movie){return movie.tconst});
    }
    else{
        movieIDs = movieIDs.tconst;
    }
    var movieTitles = await getMovieTitlesByMovieIDs(movieIDs);
    if(movieTitles.length > 1){
        movieTitles = movieTitles.map(function(movie){return movie.title});
    }
    else{
        movieTitles= movieTitle.title;
    }
    return movieTitles;
};

  /*
 * Executes a MySQL query to return a single page of movies.  Returns a
 * Promise that resolves to an array containing the fetched page of movies.
 */
function getMoviesPage(page, actorID) {
    return new Promise(async (resolve, reject) => {
      /*
       * Compute last page number and make sure page is within allowed bounds.
       * Compute offset into collection.
       */
       movies = await getMoviesByActor(actorID);
       const count = movies.length;
       const pageSize = 10;
       const lastPage = Math.ceil(count / pageSize);
       page = page > lastPage ? lastPage : page;
       page = page < 1 ? 1 : page;
       const offset = (page - 1) * pageSize;
       movies = movies.splice(offset, pageSize);

       links = {};
       if (page < lastPage) {
            links.nextPage = `/movies?page=${page + 1}`;
            links.lastPage = `/movies?page=${lastPage}`;
        }
        if (page > 1) {
            links.prevPage = `/movies?page=${page - 1}`;
            links.firstPage = '/movies?page=1';
        }
            resolve({
              movies: movies,
              page: page,
              totalPages: lastPage,
              pageSize: pageSize,
              count: count,
              links: links
            });
    });
};
  exports.getMoviesPage = getMoviesPage;