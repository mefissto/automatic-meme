import express from 'express';
import * as todosController from './todo.controller';

const todoRouter = express.Router();

todoRouter.get('/', todosController.getAllTodos);
// router.post('/', todosController.createTodo);
// router.get('/:id', todosController.getTodo);
// router.put('/:id', todosController.updateTodo);
// router.delete('/:id', todosController.deleteTodo);

export default todoRouter;
