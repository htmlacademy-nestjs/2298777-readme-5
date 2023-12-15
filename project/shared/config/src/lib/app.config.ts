import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { config, env } from 'process';

const DEFAULT_PORT = 3000;
const ENVIRONMENT = ['development', 'production', 'test'] as const;

type Environment = (typeof ENVIRONMENT)[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENT)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

const validateConfig = (config: ApplicationConfig) => {
  const error = validationSchema.validate(config, { abortEarly: true }).error;
  if (error) {
    throw new Error(`App config validation error: ${error.message}`);
  }
};

const getConfig = () => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
};

export default registerAs('app', getConfig);
