/* src/routes/reviews.routes.js */
const { Router } = require('express');

const { createReview } = require('../controllers/reviewsController');
const { validateReview } = require('../middlewares/validators');
const { decode } = require('../middlewares/tokenFunctions');

const router = Router();

router.post('/', decode, validateReview, createReview);

module.exports = router;
