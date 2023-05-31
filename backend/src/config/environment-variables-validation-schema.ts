import * as Joi from 'joi';

export const environmentVariablesValidationSchema = Joi.object({
  // General
  BACKEND_PORT: Joi.number().integer().default(4000),
  FRONTEND_HOST: Joi.string().uri().required(),

  // MongoDB
  MONGODB_CONNECTION_STRING: Joi.string().required(),

  // Mail
  EMAILS_ENABLED: Joi.boolean().required(),
  MAIL_FROM: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().integer().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),

  // Mail Subjects
  MAIL_REGISTRATION_SUBJECT: Joi.string().required(),
});
