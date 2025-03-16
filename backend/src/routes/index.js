/* src/routes/index.js */
const router = require('express').Router();

const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');
const moviesRoutes = require('./movies.routes');
const reviewsRoutes = require('./reviews.routes');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/movies', moviesRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;