import * as todoService from './todo.service';
import TodoDTO from './todo.model';
import { NextFunction, Request, Response } from 'express';

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const todos: TodoDTO[] = await todoService.getAll();
  res.json(todos);
};
