import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { TodoService } from '@services/todo.service';
import { Todo } from '@models/todo.model';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  animations: [
    trigger('todoAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('0.3s ease'),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease',
          style({ opacity: 0, transform: 'translateY(100%)' }),
        ),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = <Todo>{};

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  createTodo() {
    if (this.newTodo && this.newTodo.label.trim() !== '') {
      // Assume todos have a 'title' field, replace it with your actual field
      this.todoService.createTodo(this.newTodo).subscribe((data) => {
        // Refresh the todos list to include the new one
        this.getAllTodos();
        this.newTodo = <Todo>{};
      });
    }
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id, todo).subscribe((data) => {
      // Refresh the todos list to show the updated one
      this.getAllTodos();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe((data) => {
      // Refresh the todos list to exclude the deleted one
      this.getAllTodos();
    });
  }
}
