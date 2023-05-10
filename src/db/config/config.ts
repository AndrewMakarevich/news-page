import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export const development: SequelizeModuleOptions = {
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: +env.DB_INTERNAL_PORT || 5432,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT as Dialect,
};
