import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@services/config.service';
import { Todo } from '@models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.apiUrl = `${configService.getApiUrl()}/todos`;
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
