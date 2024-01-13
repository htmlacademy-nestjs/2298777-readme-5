import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
});

const validateConfig = (config: JWTConfig) => {
  const error = validationSchema.validate(config, { abortEarly: true }).error;
  if (error) {
    throw new Error(`JWT config validation error: ${error.message}`);
  }
};

const getConfig = (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  };

  validateConfig(config);
  return config;
};

export default registerAs('jwt', getConfig);
