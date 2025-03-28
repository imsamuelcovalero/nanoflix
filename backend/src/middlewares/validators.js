/* src/middlewares/validators.js */
const boom = require('@hapi/boom');
const {
  loginSchema,
  registerSchema,
  checkUserSchema,
  movieSchema,
  reviewSchema,
  movieIdSchema,
} = require("./joiSchemas");
const CustomError = require("../errors/CustomError");
const logger = require("../utils/customLogger");

/**
 * Função auxiliar para extrair código de status e mensagem do erro do Joi.
 * Se o erro não seguir o padrão "STATUS|Mensagem", assume status 400.
 */
const parseJoiError = (error) => {
  if (!error.message.includes("|")) {
    return { status: 400, message: error.message };
  }

  const [status, message] = error.message.split("|");
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
    const isGetRequest = req.method === "GET";
    const dataToValidate = isGetRequest ? req.params : req.body; // Seleciona dinamicamente

    logger.debug("Validation", `Validating ${schemaName}`, JSON.stringify(dataToValidate));

    // Verifica se a imagem foi enviada quando necessário
    if (schemaName === 'movieSchema' && !req.file) {
      logger.warn('ValidationError', 'Imagem não enviada no formulário');
      return next(boom.badRequest('400|A imagem é obrigatória'));
    }

    const { error } = schema.validate(dataToValidate);

    if (error) {
      const { status, message } = parseJoiError(error);

      logger.warn("ValidationError", `Validation failed: ${message}`, `Schema: ${schemaName}`);

      return next(new CustomError(status, message));
    }

    next();
  };
}

const validators = {
  validateLogin: validate(loginSchema, "loginSchema"),
  validateRegister: validate(registerSchema, "registerSchema"),
  validateCheckUserExists: validate(checkUserSchema, "checkUserSchema"),
  validateMovie: validate(movieSchema, "movieSchema"),
  validateMovieId: validate(movieIdSchema, "movieIdSchema"),
  validateReview: validate(reviewSchema, "reviewSchema"),
};

module.exports = validators;
