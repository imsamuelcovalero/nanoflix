/* src/controllers/moviesController.js */
const movieService = require("../services/moviesService");
const logger = require("../utils/customLogger");

const moviesController = {
  getMovies: async (req, res, next) => {
    try {
      logger.info("MoviesController", "Buscando lista de filmes");
      const movies = await movieService.getMovies();

      logger.info("MoviesController", `Retornando ${movies.length} filmes`);
      return res.status(200).json(movies);
    } catch (err) {
      logger.error("MoviesController", "Erro ao buscar filmes", err.message);
      next(err);
    }
  },

  getMovieById: async (req, res, next) => {
    try {
      const { movieId } = req.params;
      logger.info("MoviesController", "Buscando filme pelo ID", movieId);

      const movie = await moviesService.getMovieById(movieId);
      if (!movie) {
        return res.status(404).json({ message: "Filme não encontrado" });
      }

      return res.status(200).json(movie);
    } catch (err) {
      logger.error("MoviesController", "Erro ao buscar filme", err.message);
      next(err);
    }
  },

  createMovie: async (req, res, next) => {
    try {
      logger.info("MoviesController", "Tentativa de criação de filme", req.body.title);
      const newMovie = await movieService.createMovie(req.body);

      logger.info("MoviesController", "Filme criado com sucesso", newMovie.title);
      return res.status(201).json(newMovie);
    } catch (err) {
      logger.error("MoviesController", "Erro ao criar filme", err.message);
      next(err);
    }
  },
};

module.exports = moviesController;
