/* src/services/userService.js */
const bcrypt = require('bcrypt');
const { User } = require('../database/models');
const tokenValidator = require('../middlewares/tokenFunctions');
const boom = require('@hapi/boom');
const logger = require('../utils/customLogger');
const { Op } = require('sequelize');

const checkUserExistsBy = async (identifier) => {
  logger.info('UserService', 'Verificando existência de usuário', identifier);

  return User.findOne({
    where: {
      [Op.or]: [{ username: identifier }, { email: identifier }],
    },
  });
};

const login = async (userData) => {
  const { identifier, password } = userData;
  logger.info('UserService', 'Tentativa de login', identifier);

  const user = await checkUserExistsBy(identifier);
  if (!user) {
    logger.warn('UserService', 'Usuário não encontrado', identifier);
    throw boom.notFound('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    logger.warn('UserService', 'Senha incorreta', identifier);
    throw boom.unauthorized('Incorrect password');
  }

  const token = tokenValidator.generateToken(user);
  logger.info('UserService', 'Login bem-sucedido', identifier);

  return { token, id: user.id, name: user.name, username: user.username, email: user.email, role: user.role };
};

const checkUserExists = async (userData) => {
  const { identifier } = userData;

  const user = await checkUserExistsBy(identifier);
  if (user) {
    logger.warn('UserService', 'Usuário já existe', identifier);
    throw boom.conflict('User already exists');
  }

  return { message: 'User does not exist' };
};

const createNewUser = async (userData) => {
  const { name, username, email, password } = userData;
  logger.info('UserService', 'Tentativa de criação de usuário', email);

  const userExists = await checkUserExistsBy(email);
  if (userExists) {
    logger.warn('UserService', 'Usuário já cadastrado', email);
    throw boom.conflict('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    role: 'customer',
  });

  if (!newUser) {
    logger.error('UserService', 'Erro ao criar usuário', email);
    throw boom.internal('Failed to create user');
  }

  logger.info('UserService', 'Usuário criado com sucesso', email);
  return { message: 'User created successfully' };
};

const verifyUser = async (userId) => {
  logger.info('UserService', 'Verificando usuário pelo ID', userId);

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    logger.warn('UserService', 'Usuário não encontrado', userId);
    throw boom.notFound('User not found');
  }

  return { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role };
};

module.exports = {
  login,
  checkUserExists,
  createNewUser,
  verifyUser,
};