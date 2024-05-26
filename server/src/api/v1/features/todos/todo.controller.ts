import TodoDTO from './todo.model';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { todoService } from './todo.service';

// Higher-order function to handle async errors
const handleErrors =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };

export const getAllTodosHandler = handleErrors(
  async (req: Request, res: Response) => {
    const todos: TodoDTO[] = await todoService.findAll();
    res.json(todos);
  },
);

export const getOneTodoByIdHandler = handleErrors(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await todoService.findById(Number(id));

    res.status(StatusCodes.OK).json();
  },
);

export const createTodoHandler = handleErrors(
  async (req: Request, res: Response) => {
    await todoService.create(req.body);
    res.status(StatusCodes.OK).json();
  },
);

export const updateTodoHandler = handleErrors(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const todo: TodoDTO = await todoService.update(Number(id), updateData);

    res.status(StatusCodes.OK).json(todo);
  },
);

export const deleteTodoHandler = handleErrors(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await todoService.delete(Number(id));

    res.status(StatusCodes.OK).json();
  },
);
