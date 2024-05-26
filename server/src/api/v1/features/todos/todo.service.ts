import TodoDTO from './todo.model';

export const getAll = async (): Promise<TodoDTO[]> => {
  return [new TodoDTO(3, 'label')];
};
