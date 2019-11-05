/* Defines the schematic for a review object.
*/
const reviewSchema = {
    tconst: { required: true },
    rating: { required: true },
    review: { required: false }
  };

  const reviewInputSchema = {
    title: { required: true },
    rating: { required: true },
    review: { required: false }
  };

  exports.reviewSchema = reviewSchema;
  exports.reviewInputSchema = reviewInputSchema;