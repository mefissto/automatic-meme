import { Repository } from 'typeorm';
import TodoDTO from './todo.model';
import { TodoEntity } from '@entities/todo';
import PostgresDataSource from '@database/database';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

const ERROR_MESSAGES = {
  NOT_FOUND: 'Could not find todo with id',
  CREATE_FAILED: 'Failed to create new todo',
  UPDATE_FAILED: 'Could not update todo with id',
  DELETE_FAILED: 'Could not delete todo with id',
};

export class TodoService {
  private todoRepository: Repository<TodoEntity>;

  constructor() {
    this.todoRepository = PostgresDataSource.getRepository(TodoEntity);
  }

  async findAll(): Promise<TodoDTO[]> {
    return this.todoRepository.find();
  }

  async findById(id: number): Promise<TodoDTO> {
    try {
      return await this.todoRepository.findOneByOrFail({ id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new Error(`${ERROR_MESSAGES.NOT_FOUND} ${id}`);
      }
      throw e;
    }
  }

  async create(todo: TodoDTO): Promise<void> {
    try {
      await this.todoRepository.save(todo);
    } catch (e) {
      throw new Error(ERROR_MESSAGES.CREATE_FAILED);
    }
  }

  async update(id: number, changes: Partial<TodoDTO>): Promise<TodoDTO> {
    try {
      await this.todoRepository.update(id, changes);
      return this.findById(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new Error(`${ERROR_MESSAGES.UPDATE_FAILED} ${id}`);
      }
      throw e;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.todoRepository.delete(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new Error(`${ERROR_MESSAGES.DELETE_FAILED} ${id}`);
      }
      throw e;
    }
  }
}

export const todoService = new TodoService();
