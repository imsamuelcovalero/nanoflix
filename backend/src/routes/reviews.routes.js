/* src/routes/reviews.routes.js */
const { Router } = require("express");

const { decode } = require("../middlewares/tokenFunctions");
const { validateReview, validateMovieId } = require("../middlewares/validators");
const { createReview } = require("../controllers/reviewsController");
const { getReviews } = require("../controllers/reviewsController");

const router = Router();

router.post("/", decode, validateReview, createReview);
router.get("/:movieId", validateMovieId, getReviews);

module.exports = router;
