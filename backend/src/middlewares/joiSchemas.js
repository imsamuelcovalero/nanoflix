/* src/middlewares/joiSchemas.js */
const joi = require('joi');

const errorMessages = {
  allFieldsRequired: '400|Todos os campos devem ser preenchidos',
  invalidFields: '422|Campos inválidos',
  incorrectPassword: '400|Senha em formato inválido',
  usernameMinLength: '400|Nome de usuário deve ter pelo menos 3 caracteres',
  passwordMinLength: '400|Senha deve ter pelo menos 8 caracteres',
  usernameInvalid: '400|Username deve conter apenas letras, números e underscores',
  emailRequired: '400|Email deve existir',
  emailInvalid: '400|Email deve ser válido',
  emailUsernameEqual: '400|Email e username não podem ser iguais',
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
      case 'string.empty':
        err.message = errorMessages.allFieldsRequired;
        break;
      case 'string.email':
        err.message = errorMessages.emailInvalid;
        break;
      case 'string.min':
        err.message = errorMessages.usernameMinLength;
        break;
      case 'any.required':
        err.message = '400|Campo obrigatório';
        break;
      case 'alternatives.match':
        err.message = '400|Identifier deve ser um e-mail válido ou ter pelo menos 3 caracteres';
        break;
      default:
        err.message = '400|Erro de validação';
        break;
    }
  });
  return errors;
};

// Esquema para login
const loginSchema = joi.object({
  identifier: joi.alternatives()
    .try(joi.string().email(), joi.string().min(3))
    .required()
    .error(customJoiErrorHandler),
  password: joi.string()
    .min(8)
    .pattern(passwordRegex)
    .required()
    .messages({
      'string.min': errorMessages.passwordMinLength,
      'string.empty': errorMessages.allFieldsRequired,
      'string.pattern.base': errorMessages.incorrectPassword,
      'any.required': '400|Password deve existir',
    }),
});

// Esquema para registro
const registerSchema = joi.object({
  name: joi.string().min(5).required().messages({
    'string.min': '400|Nome deve ter pelo menos 5 caracteres',
    'string.empty': errorMessages.allFieldsRequired,
    'any.required': '400|Nome deve existir',
  }),
  username: joi.string().min(3).pattern(usernameRegex).required().messages({
    'string.min': errorMessages.usernameMinLength,
    'string.empty': errorMessages.allFieldsRequired,
    'any.required': '400|Username deve existir',
    'string.pattern.base': errorMessages.usernameInvalid,
  }),
  email: joi.string().email().invalid(joi.ref('username')).required().messages({
    'string.empty': errorMessages.allFieldsRequired,
    'string.email': errorMessages.emailInvalid,
    'any.required': errorMessages.emailRequired,
    'any.invalid': errorMessages.emailUsernameEqual,
  }),
  password: joi.string().min(8).pattern(passwordRegex).required().messages({
    'string.min': errorMessages.passwordMinLength,
    'string.empty': errorMessages.allFieldsRequired,
    'string.pattern.base': errorMessages.incorrectPassword,
    'any.required': '400|Password deve existir',
  }),
});

// Esquema para verificar se o usuário existe
const checkUserSchema = joi.object({
  identifier: joi.alternatives()
    .try(joi.string().email(), joi.string().min(3))
    .required()
    .messages({
      'string.empty': errorMessages.allFieldsRequired,
      'alternatives.match': errorMessages.invalidFields,
      'any.required': '400|Identifier deve existir',
    }),
});

module.exports = { loginSchema, registerSchema, checkUserSchema };