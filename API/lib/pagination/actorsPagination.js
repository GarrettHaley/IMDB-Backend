const { getActorsByMovie } = require('../sqlQueries/movieActorQueries');

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