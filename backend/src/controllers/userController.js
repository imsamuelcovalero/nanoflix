/* src/controllers/userController.js */
const boom = require('@hapi/boom');
const userService = require('../services/userService');
const logger = require('../utils/customLogger');

const userController = {
  login: async (req, res, next) => {
    try {
      logger.info('UserController', 'Tentativa de login', req.body.identifier);
      const result = await userService.login(req.body);

      logger.info('UserController', 'Login bem-sucedido', req.body.identifier);
      return res.status(200).json(result);
    } catch (err) {
      logger.error('UserController', 'Erro no login', err.message);
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      logger.info('UserController', 'Tentativa de registro', req.body.email);
      const result = await userService.createNewUser(req.body);

      logger.info('UserController', 'Usuário registrado com sucesso', req.body.email);
      return res.status(201).json(result);
    } catch (err) {
      logger.error('UserController', 'Erro ao registrar usuário', err.message);
      next(err);
    }
  },

  checkUserExists: async (req, res, next) => {
    try {
      logger.info('UserController', 'Verificando existência de usuário', req.body.email);
      const result = await userService.checkUserExists(req.body);

      return res.status(200).json(result);
    } catch (err) {
      logger.error('UserController', 'Erro ao verificar usuário', err.message);
      next(err);
    }
  },

  verifyUser: async (req, res, next) => {
    try {
      if (!req.user) {
        logger.warn('UserController', 'Tentativa de verificação sem autenticação');
        throw boom.unauthorized('User is not authenticated');
      }

      logger.info('UserController', 'Verificando usuário autenticado', req.user.email);
      const { id } = req.user;
      const result = await userService.verifyUser(id);

      return res.status(200).json(result);
    } catch (err) {
      logger.error('UserController', 'Erro ao verificar usuário', err.message);
      next(err);
    }
  },
};

module.exports = userController;