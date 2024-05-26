import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  animations: [
    trigger('taskAnimation', [
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
  tasks: string[] = [];
  newTask: string = '';

  constructor() {}

  ngOnInit(): void {}

  addTask(): void {
    if (this.newTask && this.newTask.trim() !== '') {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
