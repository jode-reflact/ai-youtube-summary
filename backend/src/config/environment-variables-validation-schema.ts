import * as Joi from 'joi';

export const environmentVariablesValidationSchema = Joi.object({
  // General
  BACKEND_PORT: Joi.number().integer().default(4000),
});
