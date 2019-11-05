/* Defines the schematic for a review object.
*/
const reviewSchema = {
    tconst: { required: true },
    rating: { required: true },
    review: { required: false }
  };

/* Defines the schematic for a review request.
*/

  const reviewInputSchema = {
    title: { required: true },
    rating: { required: true },
    review: { required: false }
  };

  exports.reviewSchema = reviewSchema;
  exports.reviewInputSchema = reviewInputSchema;