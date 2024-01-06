import { registerAs } from '@nestjs/config';
import Joi = require('joi');

const DEFAULT_PORT = 3000;

const ENVIRONMENT = ['development', 'production', 'test'] as const;

type Environment = (typeof ENVIRONMENT)[number];

export interface FileUploaderConfig {
  environment: Environment;
  port: number;
  uploaderDir: string;
}

const config: FileUploaderConfig = {
  environment: process.env.NODE_ENV as Environment,
  port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  uploaderDir: process.env.UPLOADER_DIR as string,
};

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENT)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploaderDir: Joi.string().required(),
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
  };

  validateConfig(config);
  return config;
};

export default registerAs('app', getConfig);
