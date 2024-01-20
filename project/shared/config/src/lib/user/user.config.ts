import { registerAs } from '@nestjs/config';
import Joi = require('joi');

const DEFAULT_PORT = 3005;
const DEFAULT_MONGO_PORT = 27019;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = 5672;

type Environment = (typeof ENVIRONMENTS)[number];

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    authSource: string;
  };
  rabbit: {
    host: string;
    port: number;
    username: string;
    password: string;
    queue: string;
    exchange: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().default(DEFAULT_PORT),
  db: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DEFAULT_MONGO_PORT),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
    authSource: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    username: Joi.string().required(),
    password: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  }),
});

const validateConfig = (config: NotifyConfig) => {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};

const getConfig = (): NotifyConfig => {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT as string, 10),
    db: {
      host: process.env.MONGODB_HOST as string,
      port: parseInt(process.env.MONGODB_PORT as string, 10),
      username: process.env.MONGODB_USER as string,
      password: process.env.MONGODB_PASSWORD as string,
      database: process.env.MONGODB_DATABASE as string,
      authSource: process.env.MONGODB_AUTH_SOURCE as string,
    },
    rabbit: {
      host: process.env.RABBIT_HOST as string,
      port: parseInt(process.env.RABBIT_PORT as string, 10),
      username: process.env.RABBIT_USERNAME as string,
      password: process.env.RABBIT_PASSWORD as string,
      queue: process.env.RABBIT_QUEUE as string,
      exchange: process.env.RABBIT_EXCHANGE as string,
    },
  };

  validateConfig(config);
  return config;
};

export default registerAs('app', getConfig);
