/* src/services/reviewsService.js */
const { Review, Movie } = require("../database/models");
const logger = require("../utils/customLogger");
const boom = require("@hapi/boom");

const createReview = async ({ movieId, rating, comment, userId }) => {
  logger.info("ReviewsService", "Criando review para filme", movieId);

  const movie = await Movie.findByPk(movieId);
  if (!movie) {
    logger.warn("ReviewsService", "Filme não encontrado", movieId);
    throw boom.notFound("Movie not found");
  }

  const review = await Review.create({ movie_id: movieId, user_id: userId, rating, comment });

  logger.info("ReviewsService", "Review criada com sucesso", review.id);
  return review;
};

const getReviewsByMovie = async (movieId) => {
  logger.info("ReviewsService", "Buscando reviews para o filme", movieId);

  const reviews = await Review.findAll({
    where: { movie_id: movieId },
    attributes: ["id", "movie_id", "user_id", "rating", "comment", "created_at"],
  });

  return reviews;
};

module.exports = { createReview, getReviewsByMovie };
