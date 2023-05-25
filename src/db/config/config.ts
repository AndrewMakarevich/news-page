import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

const common: SequelizeModuleOptions = {
  database: env.DB_NAME,
  host: env.DB_CONTAINER_NAME,
  port: Number(env.DB_INTERNAL_PORT) || 5432,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT as Dialect,
};

export const development = common;
export const production = common;
export const test = common;
