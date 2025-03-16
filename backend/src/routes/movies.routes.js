/* src/routes/movies.routes.js */
const { Router } = require('express');

const { getMovies, createMovie } = require('../controllers/moviesController');
const { validateMovie } = require('../middlewares/validators');
const { decode, authorize } = require('../middlewares/tokenFunctions');

const router = Router();

router.get('/', getMovies);
router.post('/', decode, authorize(['admin']), validateMovie, createMovie);

module.exports = router;
