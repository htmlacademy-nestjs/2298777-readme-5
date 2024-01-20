import { registerAs } from '@nestjs/config';
import Joi = require('joi');

const DEFAULT_PORT = 3000;

const ENVIRONMENT = ['development', 'production', 'test'] as const;

type Environment = (typeof ENVIRONMENT)[number];

export interface FileUploaderConfig {
  environment: Environment;
  port: number;
  uploaderDir: string;
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
    authBase: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENT)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploaderDir: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().required(),
    port: Joi.number().port(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
});

const validateConfig = (config: FileUploaderConfig) => {
  const error = validationSchema.validate(config, { abortEarly: true }).error;
  if (error) {
    throw new Error(`App config validation error: ${error.message}`);
  }
};

const getConfig = () => {
  const config: FileUploaderConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    uploaderDir: process.env.UPLOADER_DIR as string,
    db: {
      host: process.env.MONGODB_HOST!,
      port: parseInt(process.env.MONGODB_PORT || `${DEFAULT_PORT}`, 10),
      user: process.env.MONGODB_USER!,
      password: process.env.MONGODB_PASSWORD!,
      name: process.env.MONGODB_DATABASE!,
      authBase: process.env.MONGODB_AUTH_SOURCE!,
    },
  };

  validateConfig(config);
  return config;
};

export default registerAs('app', getConfig);
