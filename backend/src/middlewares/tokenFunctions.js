/* src/middlewares/tokenFunctions.js */
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const logger = require('../utils/customLogger');

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new boom.internal('JWT_SECRET not provided');
}

const tokenFunctions = {
  generateToken: (user) => {
    const signOptions = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      secret,
      signOptions
    );

    logger.info('JWT', 'Token gerado para usuário', user.email);
    return `Bearer ${token}`; // Adiciona o prefixo 'Bearer' automaticamente
  },

  decode: (req, _res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      logger.warn('JWT', 'Token não fornecido na requisição');
      throw boom.unauthorized('Token not provided');
    }

    // Remove 'Bearer ' se estiver presente
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    try {
      const decoded = jwt.verify(token, secret);
      logger.info('JWT', 'Token decodificado com sucesso', decoded.email);

      req.user = decoded;
      next();
    } catch (err) {
      logger.error('JWT', 'Falha ao validar token', err.message);
      throw boom.unauthorized('Token is malformed');
    }
  },

  authorize: (roles) => (req, _res, next) => {
    if (!req.user) {
      logger.warn('JWT', 'Usuário não autenticado tentou acessar um recurso protegido');
      throw boom.unauthorized('User is not authenticated');
    }

    const { role } = req.user;

    if (!roles.includes(role)) {
      logger.warn('JWT', `Acesso negado para o usuário ${req.user.email}, role: ${role}`);
      throw boom.forbidden('User is not authorized');
    }

    logger.info('JWT', `Usuário autorizado: ${req.user.email}, role: ${role}`);
    next();
  },
};

module.exports = tokenFunctions;
