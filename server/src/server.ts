import 'reflect-metadata';
import app from './app';
import http from 'http';
import PostgresDataSource from './database/database';
import { Express } from 'express';

const SERVER_PORT: number = Number(process.env.PORT || 3000);

async function initializeDatabase(): Promise<void> {
  try {
    await PostgresDataSource.initialize();
    console.info('Initialized PostgresDataSource');
  } catch (error) {
    console.error(`Failed to initialize PostgresDataSource: ${error}`);
    throw error;
  }
}

function startServer(app: Express, port: number): void {
  const server: http.Server = http.createServer(app);
  server.listen(port, (): void => {
    console.log(`Server is running at http://localhost:${port}...`);
  });
}

(async function initializeApplication(): Promise<void> {
  try {
    await initializeDatabase();
    startServer(app, SERVER_PORT);
    console.info('Application initialized successfully');
  } catch (error) {
    console.error(`Failed to initialize the application: ${error}`);
  }
})();
