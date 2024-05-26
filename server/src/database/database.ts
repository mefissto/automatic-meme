import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import {
  DEFAULT_DB_NAME,
  DEFAULT_DB_PASSWORD,
  DEFAULT_HOST,
  DEFAULT_PORT,
  DEFAULT_USERNAME,
  ENTITY_PATH,
} from './database.constants';

dotenv.config();

function createDatabaseConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || DEFAULT_HOST,
    port: parseInt(process.env.DB_PORT!) || DEFAULT_PORT,
    username: process.env.DB_USERNAME || DEFAULT_USERNAME,
    database: process.env.DB_NAME || DEFAULT_DB_NAME,
    password: process.env.DB_PASSWORD || DEFAULT_DB_PASSWORD,
    logging: false,
    synchronize: true,
    entities: [ENTITY_PATH],
    ssl: false,
    // TODO: check ssl option for localhost/external DB.
    // extra: {
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // }
  };
}

const PostgresDataSource: DataSource = new DataSource(createDatabaseConfig());

export default PostgresDataSource;
