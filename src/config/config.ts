import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();
console.log(env);

const defaultConfig = {
  port: +env.DB_PORT || 5432,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT as Dialect,
};

export const production: SequelizeModuleOptions = {
  host: env.PROD_DB_NAME,
  ...defaultConfig,
};

export const development: SequelizeModuleOptions = {
  host: env.DEV_DB_NAME,
  ...defaultConfig,
};

export const test: SequelizeModuleOptions = {
  host: env.DEV_DB_NAME,
  ...defaultConfig,
};
