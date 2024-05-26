import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { appRoutes } from './api';

const app: Express = express();

function setupMiddlewares(app: Express): void {
  // Allow Cross-Origin requests.
  app.use(cors());
  // Log HTTP requests.
  app.use(morgan('combined'));
  // Helmet helps secure Express apps by setting HTTP response headers.
  app.use(helmet());
  // Parse incoming requests data
  setupBodyParser(app);
  // TODO: add more middlewares setup here for better organization
}

function setupBodyParser(app: Express) {
  app.use(json());
  app.use(urlencoded({ extended: false }));
}

setupMiddlewares(app);

// Routes
app.use('/api', appRoutes);

export default app;
