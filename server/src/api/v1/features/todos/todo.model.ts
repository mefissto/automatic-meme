export class TodoDTO {
  id: number;
  label: string;
  completed: boolean;

  constructor(dto: Partial<TodoDTO>) {
    Object.assign(this, dto);
  }
}

export default TodoDTO;
