/* src/controllers/reviewsController.js */
const reviewsService = require("../services/reviewsService");
const logger = require("../utils/customLogger");

const reviewsController = {
  createReview: async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      logger.info("ReviewsController", `Usuário ${userId} enviando review`);

      const review = await reviewsService.createReview({ ...req.body, userId });
      logger.info("ReviewsController", "Review criada com sucesso", review.id);

      const { id, movie_id, user_id, rating, comment } = review;
      return res.status(201).json({ id, movie_id, user_id, rating, comment });
    } catch (err) {
      logger.error("ReviewsController", "Erro ao criar review", err.message);
      next(err);
    }
  },

  getReviews: async (req, res, next) => {
    try {
      const { movieId } = req.params;
      logger.info("ReviewsController", "Buscando reviews do filme", movieId);

      const reviews = await reviewsService.getReviewsByMovie(movieId);

      return res.status(200).json(reviews);
    } catch (err) {
      logger.error("ReviewsController", "Erro ao buscar reviews", err.message);
      next(err);
    }
  },
};

module.exports = reviewsController;
