/* src/services/moviesService.js */
const { Movie } = require("../database/models");
const boom = require("@hapi/boom");
const logger = require("../utils/customLogger");

const getMovies = async () => {
  logger.info("MoviesService", "Buscando todos os filmes");

  const movies = await Movie.findAll({
    attributes: ["id", "title", "description", "genre", "release_year", "url_image"], // Exclui createdAt e updatedAt
  });

  if (!movies.length) {
    logger.warn("MoviesService", "Nenhum filme encontrado");
    throw boom.notFound("No movies found");
  }

  logger.info("MoviesService", `Retornando ${movies.length} filmes`);
  return movies;
};

const getMovieById = async (movieId) => {
  logger.info("MoviesService", "Buscando filme pelo ID", movieId);
  return await Movie.findByPk(movieId);
};

const createMovie = async (movieData) => {
  const { title, description, releaseYear, genre, urlImage } = movieData;

  logger.info("MoviesService", "Tentativa de criação de filme", title);

  const existingMovie = await Movie.findOne({
    where: { title, release_year: releaseYear },
  });

  if (existingMovie) {
    logger.warn("MoviesService", "Filme já cadastrado", title);
    throw boom.conflict("Movie already exists");
  }

  const newMovie = await Movie.create({
    title,
    description,
    release_year: releaseYear,
    genre,
    url_image: urlImage,
  });

  if (!newMovie) {
    logger.error("MoviesService", "Erro ao criar filme", title);
    throw boom.internal("Failed to create movie");
  }

  logger.info("MoviesService", "Filme criado com sucesso", title);
  return newMovie;
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
};
