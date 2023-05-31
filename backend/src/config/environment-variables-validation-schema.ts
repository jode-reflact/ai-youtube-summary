import * as Joi from 'joi';

export const environmentVariablesValidationSchema = Joi.object({
  // General
  BACKEND_PORT: Joi.number().integer().default(4000),

  // MongoDB
  MONGODB_CONNECTION_STRING: Joi.string().required(),
});
