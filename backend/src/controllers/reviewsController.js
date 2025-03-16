/* src/controllers/reviewsController.js */
const reviewsService = require('../services/reviewsService');
const logger = require('../utils/customLogger');

const reviewsController = {
  createReview: async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      logger.info('ReviewsController', 'Usuário enviando review', userId);

      const review = await reviewsService.createReview({ ...req.body, userId });
      logger.info('ReviewsController', 'Review criada com sucesso', review.id);

      const { id, movie_id, user_id, rating, comment } = review;
      return res.status(201).json({ id, movie_id, user_id, rating, comment });
    } catch (err) {
      logger.error('ReviewsController', 'Erro ao criar review', err.message);
      next(err);
    }
  },
};

module.exports = reviewsController;

