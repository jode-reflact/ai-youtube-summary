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
  MAIL_SUBJECT_REGISTRATION: Joi.string().required(),
  MAIL_SUBJECT_REQUEST_PASSWORD_RESET: Joi.string().required(),

  // Auth with JWT
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),

  // Users
  TIME_PERIOD_TO_CONFIRM_EMAIL: Joi.string().required(),
  TIME_PERIOD_TO_RESET_PASSWORD: Joi.string().required(),
});
