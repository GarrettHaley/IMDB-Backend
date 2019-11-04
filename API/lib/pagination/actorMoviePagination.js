const { getMovieDataAboveReview } = require('../sqlQueries/movieActorQueries');
const { getActorsByMovie } = require('../sqlQueries/movieActorQueries');
 /*
 * Executes a MySQL query to return a single page of movies and reviews.  Returns a
 * Promise that resolves to an paginated response containing the fetched page of movies/reviews above a given rating.
 */
function getMoviesDataPage(page, reviewValue) {
    return new Promise(async (resolve, reject) => {
      /*
       * Compute last page number and make sure page is within allowed bounds.
       * Compute offset into collection.
       */
       var movieReviewData = [];
       var actors = []
       const movieData = await getMovieDataAboveReview(reviewValue);
       if (movieData == null){
           reject(true);
       }
       else if(movieData.length > 1){
            const movies = new Set(movieData.map(function(movie){return movie.title}));
            for (var set = movies.values(), movie = null; movie = set.next().value; ) {
                actors = getActorsByMovie(movie);
                movieReviewData.push({movie:movie, actors: actors});
            }
       }
       else{
            actors = await getActorsByMovie(movie.title);
            movieReviewData.push({movie:movies.title, actors: actors});
       }    
       const count = movieReviewData.length;
       const pageSize = 10;
       const lastPage = Math.ceil(count / pageSize);
       page = page > lastPage ? lastPage : page;
       page = page < 1 ? 1 : page;
       const offset = (page - 1) * pageSize;
       movieReviewData = movieReviewData.splice(offset, pageSize);

       links = {};
       if (page < lastPage) {
            links.nextPage = `/${reviewValue}?page=${page + 1}`;
            links.lastPage = `/${reviewValue}?page=${lastPage}`;
        }
        if (page > 1) {
            links.prevPage = `/${reviewValue}?page=${page - 1}`;
            links.firstPage = `/${reviewValue}?page=1`;
        }
            resolve({
              movies: movieReviewData,
              page: page,
              totalPages: lastPage,
              pageSize: pageSize,
              count: count,
              links: links
            });
    });
};
  exports.getMoviesDataPage = getMoviesDataPage;