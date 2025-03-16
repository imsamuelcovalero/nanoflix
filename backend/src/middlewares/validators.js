/* src/middlewares/validators.js */
const { loginSchema, registerSchema, checkUserSchema } = require('./joiSchemas');
const CustomError = require('../errors/CustomError');
const logger = require('../utils/customLogger');

/**
 * Função auxiliar para extrair código de status e mensagem do erro do Joi.
 * Se o erro não seguir o padrão "STATUS|Mensagem", assume status 400.
 */
const parseJoiError = (error) => {
  if (!error.message.includes('|')) {
    return { status: 400, message: error.message };
  }

  const [status, message] = error.message.split('|');
  return {
    status: isNaN(status) ? 400 : Number(status),
    message,
  };
};

/**
 * Middleware de validação utilizando Joi e a classe CustomError.
 */
function validate(schema, schemaName) {
  return (req, _res, next) => {
    logger.debug('Validation', `Validating ${schemaName}`, JSON.stringify(req.body));

    const { error } = schema.validate(req.body);

    if (error) {
      const { status, message } = parseJoiError(error);

      logger.warn('ValidationError', `Validation failed: ${message}`, `Schema: ${schemaName}`);

      throw new CustomError(status, message);
    }

    next();
  };
}

const validators = {
  validateLogin: validate(loginSchema, 'loginSchema'),
  validateRegister: validate(registerSchema, 'registerSchema'),
  validateCheckUserExists: validate(checkUserSchema, 'checkUserSchema'),
};

module.exports = validators;
