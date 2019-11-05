const mysqlPool = require('./../auxiliary/mysqlPool');

function insertNewReview(review) {
    return new Promise((resolve, reject) => {
      mysqlPool.query(
        'INSERT INTO reviews SET ?',
        review,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }
  exports.insertNewReview = insertNewReview