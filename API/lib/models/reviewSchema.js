/* Defines the schematic for a review object.
*/
const ReviewSchema = {
    movie: { required: true },
    rating: { required: true },
    review: { required: false }
  };

  exports.ReviewSchema = ReviewSchema;