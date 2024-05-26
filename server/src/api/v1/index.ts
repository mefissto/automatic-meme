import express from 'express';
import todoRoutes from './features/todos/todo.routes';

export const v1Routes = express.Router();

v1Routes.use('/todos', todoRoutes);
