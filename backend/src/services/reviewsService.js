/* src/services/reviewsService.js */
const { Review, Movie } = require('../database/models');
const logger = require('../utils/customLogger');
const boom = require('@hapi/boom');

const createReview = async ({ movie_id, rating, comment, userId }) => {
  logger.info('ReviewsService', 'Criando review para filme', movie_id);

  const movie = await Movie.findByPk(movie_id);
  if (!movie) {
    logger.warn('ReviewsService', 'Filme não encontrado', movie_id);
    throw boom.notFound('Movie not found');
  }

  const review = await Review.create({ movie_id, user_id: userId, rating, comment });

  logger.info('ReviewsService', 'Review criada com sucesso', review.id);
  return review;
};

module.exports = { createReview };
