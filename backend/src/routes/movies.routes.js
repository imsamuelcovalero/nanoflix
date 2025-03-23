/* src/routes/movies.routes.js */
const { Router } = require("express");

const { getMovies, getMovieById, createMovie } = require("../controllers/moviesController");
const { validateMovie, validateMovieId } = require("../middlewares/validators");
const { decode, authorize } = require("../middlewares/tokenFunctions");
const upload = require('../middlewares/uploadMiddleware');

const router = Router();

router.get("/", getMovies);
router.get("/:movieId", validateMovieId, getMovieById);
router.post("/", decode, authorize(["admin"]), upload.single('image'), validateMovie, createMovie);

module.exports = router;
