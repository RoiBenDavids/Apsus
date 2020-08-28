
export const reviewService = {
  query,
  addReview,
  editReview,
  // getEmpty,
  remove,
  getBookReviewsById

}

const STORAGE_KEY_REVIEW = 'reviews'


let booksReviews = (loadFromStorage(STORAGE_KEY_REVIEW)) ? loadFromStorage(STORAGE_KEY_REVIEW) : []

function query() {
  return Promise.resolve(booksReviews)
}

function getBookReviewsById(bookId) {
  return Promise.resolve(booksReviews.find(book => book.id === bookId))
}

function remove(bookId, reviewId) {
  console.log("remove -> reviewId", reviewId)
  var idx = booksReviews.findIndex(book => book.id === bookId)
  console.log("remove -> booksReviews[idx].reviews", booksReviews[idx].reviews)
  booksReviews[idx].reviews=booksReviews[idx].reviews.filter(review => {return review.id !== reviewId});
  console.log("remove -> booksReviews[idx].reviews", booksReviews[idx].reviews)
  saveToStorage(STORAGE_KEY_REVIEW, booksReviews); 
}

function addReview(bookId, review) {
  var newReview= {...review,id:makeId()}
  var idx = booksReviews.findIndex(book => book.id === bookId)
  if (idx===-1) booksReviews.unshift({id:bookId,reviews:[newReview]})
  else booksReviews[idx].reviews.push(newReview)
  saveToStorage(STORAGE_KEY_REVIEW, booksReviews); 
}

function editReview(bookId, review) {
  let bookIdx=booksReviews.findIndex(book=> book.id===bookId);
  let revIdx=booksReviews[bookIdx].reviews.findIndex(rev=>review.id===rev.id);
  booksReviews[bookIdx].reviews[revIdx]=review;
  saveToStorage(STORAGE_KEY_REVIEW, booksReviews); 
}

function makeId(length=5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}