import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface RabbitConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  queue: string;
  exchange: string;
}

const validationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
  username: Joi.string().required(),
  password: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

function validateConfig(config: RabbitConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[FileVault Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): RabbitConfig {
  const config: RabbitConfig = {
    host: process.env.RABBIT_HOST as string,
    port: parseInt(process.env.RABBIT_PORT as string, 10),
    username: process.env.RABBIT_USERNAME as string,
    password: process.env.RABBIT_PASSWORD as string,
    queue: process.env.RABBIT_QUEUE as string,
    exchange: process.env.RABBIT_EXCHANGE as string,
  };

  validateConfig(config);
  return config;
}

export default registerAs('rabbit', getConfig);
