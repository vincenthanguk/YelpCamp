const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const reviews = require('../controllers/reviews');
const Review = require('../models/review');
const Campground = require('../models/campground');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// delete review and reference to review within campground document
router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
