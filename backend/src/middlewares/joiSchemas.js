/* src/middlewares/joiSchemas.js */
const joi = require("joi");

const errorMessages = {
  allFieldsRequired: "400|Todos os campos devem ser preenchidos",
  invalidFields: "422|Campos inválidos",
  incorrectPassword: "400|Senha em formato inválido",
  usernameMinLength: "400|Nome de usuário deve ter pelo menos 3 caracteres",
  passwordMinLength: "400|Senha deve ter pelo menos 8 caracteres",
  usernameInvalid: "400|Username deve conter apenas letras, números e underscores",
  emailRequired: "400|Email deve existir",
  emailInvalid: "400|Email deve ser válido",
  emailUsernameEqual: "400|Email e username não podem ser iguais",
  titleRequired: "400|Title deve existir",
  descriptionRequired: "400|Description deve existir",
  genreRequired: "400|Genre deve existir",
  releaseYearRequired: "400|ReleaseYear deve existir e ser um ano válido",
  urlImageRequired: "400|URL da imagem deve existir",
  movieIdRequired: "400|O ID do filme é obrigatório",
  movieIdInvalid: "400|O ID do filme deve ser um número inteiro",
  ratingRequired: "400|A avaliação é obrigatória",
  ratingMin: "400|A avaliação deve ser no mínimo 1",
  ratingMax: "400|A avaliação deve ser no máximo 5",
  commentInvalid: "400|O comentário deve ser um texto",
};

// const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Pelo menos 1 letra maiúscula, 1 número e 8 caracteres, sem caracteres especiais
const passwordRegex = /^.{8,}$/; // Pelo menos 8 caracteres
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

/**
 * Função para personalizar mensagens de erro no Joi
 */
const customJoiErrorHandler = (errors) => {
  errors.forEach((err) => {
    switch (err.code) {
      case "string.empty":
        err.message = errorMessages.allFieldsRequired;
        break;
      case "string.email":
        err.message = errorMessages.emailInvalid;
        break;
      case "string.min":
        err.message = errorMessages.usernameMinLength;
        break;
      case "any.required":
        err.message = "400|Campo obrigatório";
        break;
      case "alternatives.match":
        err.message = "400|Identifier deve ser um e-mail válido ou ter pelo menos 3 caracteres";
        break;
      default:
        err.message = "400|Erro de validação";
        break;
    }
  });
  return errors;
};

// Esquema para login
const loginSchema = joi.object({
  identifier: joi
    .alternatives()
    .try(joi.string().email(), joi.string().min(3))
    .required()
    .error(customJoiErrorHandler),
  password: joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.min": errorMessages.passwordMinLength,
    "string.empty": errorMessages.allFieldsRequired,
    "string.pattern.base": errorMessages.incorrectPassword,
    "any.required": "400|Password deve existir",
  }),
});

// Esquema para registro
const registerSchema = joi.object({
  name: joi.string().min(5).required().messages({
    "string.min": "400|Nome deve ter pelo menos 5 caracteres",
    "string.empty": errorMessages.allFieldsRequired,
    "any.required": "400|Nome deve existir",
  }),
  username: joi.string().min(3).pattern(usernameRegex).required().messages({
    "string.min": errorMessages.usernameMinLength,
    "string.empty": errorMessages.allFieldsRequired,
    "any.required": "400|Username deve existir",
    "string.pattern.base": errorMessages.usernameInvalid,
  }),
  email: joi.string().email().invalid(joi.ref("username")).required().messages({
    "string.empty": errorMessages.allFieldsRequired,
    "string.email": errorMessages.emailInvalid,
    "any.required": errorMessages.emailRequired,
    "any.invalid": errorMessages.emailUsernameEqual,
  }),
  password: joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.min": errorMessages.passwordMinLength,
    "string.empty": errorMessages.allFieldsRequired,
    "string.pattern.base": errorMessages.incorrectPassword,
    "any.required": "400|Password deve existir",
  }),
});

// Esquema para verificar se o usuário existe
const checkUserSchema = joi.object({
  identifier: joi
    .alternatives()
    .try(joi.string().email(), joi.string().min(3))
    .required()
    .messages({
      "string.empty": errorMessages.allFieldsRequired,
      "alternatives.try": errorMessages.invalidFields,
      "any.required": "400|Identifier deve existir",
    }),
});

// Esquema para inserir um novo movie
const movieSchema = joi.object({
  title: joi.string().required().messages({
    "string.empty": errorMessages.allFieldsRequired,
    "any.required": errorMessages.titleRequired,
  }),
  description: joi.string().required().messages({
    "string.empty": errorMessages.allFieldsRequired,
    "any.required": errorMessages.descriptionRequired,
  }),
  genre: joi.string().required().messages({
    "string.empty": errorMessages.allFieldsRequired,
    "any.required": errorMessages.genreRequired,
  }),
  releaseYear: joi.number().integer().min(1888).required().messages({
    "number.base": errorMessages.releaseYearRequired,
    "number.min": "400|ReleaseYear deve ser um ano válido a partir de 1888",
    "any.required": errorMessages.releaseYearRequired,
  }),
});

const reviewSchema = joi.object({
  movieId: joi.number().integer().required().messages({
    "number.base": errorMessages.movieIdInvalid,
    "any.required": errorMessages.movieIdRequired,
  }),
  rating: joi.number().integer().min(1).max(5).required().messages({
    "number.base": errorMessages.ratingRequired,
    "number.min": errorMessages.ratingMin,
    "number.max": errorMessages.ratingMax,
    "any.required": errorMessages.ratingRequired,
  }),
  comment: joi.string().optional().allow("").messages({
    "string.base": errorMessages.commentInvalid,
  }),
});

const movieIdSchema = joi.object({
  movieId: joi.number().integer().required().messages({
    "number.base": "O ID do filme deve ser um número inteiro",
    "any.required": "O ID do filme é obrigatório",
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
  checkUserSchema,
  movieSchema,
  reviewSchema,
  movieIdSchema,
};
