import { registerAs } from '@nestjs/config';
import Joi = require('joi');

const DEFAULT_PORT = 27017;

export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const validationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  name: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});

const validateConfig = (config: MongoConfig) => {
  const error = validationSchema.validate(config, { abortEarly: true }).error;
  if (error) {
    throw new Error(`Mongo config validation error: ${error.message}`);
  }
};

const getMongoConfig = () => {
  const config: MongoConfig = {
    host: process.env.MONGODB_HOST!,
    name: process.env.MONGODB_DATABASE!,
    port: parseInt(process.env.MONGODB_PORT || `${DEFAULT_PORT}`, 10),
    user: process.env.MONGODB_USER!,
    password: process.env.MONGODB_PASSWORD!,
    authBase: process.env.MONGODB_AUTH_SOURCE!,
  };

  validateConfig(config);
  return config;
};

export default registerAs('mongo', getMongoConfig);
