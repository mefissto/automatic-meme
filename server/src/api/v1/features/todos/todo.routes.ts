import express from 'express';
import * as todosController from './todo.controller';

const todoRouter = express.Router();

todoRouter.get('/', todosController.getAllTodosHandler);
todoRouter.post('/', todosController.createTodoHandler);
todoRouter.get('/:id', todosController.getOneTodoByIdHandler);
todoRouter.patch('/:id', todosController.updateTodoHandler);
todoRouter.delete('/:id', todosController.deleteTodoHandler);

export default todoRouter;
