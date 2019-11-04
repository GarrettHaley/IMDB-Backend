
const { getMoviesByActor } = require('./../sqlQueries/movieActorQueries');
const { getActorsByMovie } = require('./../sqlQueries/movieActorQueries');

  /*
 * Executes a MySQL query to return a single page of movies.  Returns a
 * Promise that resolves to an paginated response containing the fetched page of movies.
 */
function getMoviesPage(page, actorID) {
    return new Promise(async (resolve, reject) => {
      /*
       * Compute last page number and make sure page is within allowed bounds.
       * Compute offset into collection.
       */
       var movies = await getMoviesByActor(actorID);
       if (movies == null){
           reject(true);
       }
       else if(movies.length > 1){
            movies = movies.map(function(movie){return movie.title});
       }
       else{
            movies = [movies.title];
       }       
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

  /*
 * Executes a MySQL query to return a single page of actors.  Returns a
 * Promise that resolves to an paginated response containing the fetched page of actors for a given movie.
 */
function getActorsPage(page, movieID) {
    return new Promise(async (resolve, reject) => {
      /*
       * Compute last page number and make sure page is within allowed bounds.
       * Compute offset into collection.
       */
       var actors = await getActorsByMovie(movieID);
       if (actors == null){
           reject(true);
       }
       else if(actors.length > 1){
            actors = actors.map(function(actor){return actor.name});
       }
       else{
            actors = [actors.name];
       }      
       const count = actors.length;
       const pageSize = 10;
       const lastPage = Math.ceil(count / pageSize);
       page = page > lastPage ? lastPage : page;
       page = page < 1 ? 1 : page;
       const offset = (page - 1) * pageSize;
       actors = actors.splice(offset, pageSize);

       links = {};
       if (page < lastPage) {
            links.nextPage = `/actors?page=${page + 1}`;
            links.lastPage = `/actors?page=${lastPage}`;
        }
        if (page > 1) {
            links.prevPage = `/actors?page=${page - 1}`;
            links.firstPage = '/actors?page=1';
        }
            resolve({
              actors: actors,
              page: page,
              totalPages: lastPage,
              pageSize: pageSize,
              count: count,
              links: links
            });
    });
};
  exports.getActorsPage = getActorsPage;

