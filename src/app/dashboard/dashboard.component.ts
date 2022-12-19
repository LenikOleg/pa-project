import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TodosService } from '../services/todos.service';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  todos: any;
  constructor(
    private authService: AuthService,
    private todosService: TodosService
  ) {}
  ngOnInit(): void {
    this.authService.userInfo.subscribe((value) => {
      if (value) {
        this.userName = value['username'];
      }
    });
    this.loadTodos();
    console.log(this.authService.userInfo.getValue());
  }

  loadTodos() {
    this.todosService
      .getTodos()
      .pipe(
        tap({
          next: (value) => {
            this.todos = value;
          },
          error: (error) => {
            console.log(error);
            console.log('failted to load todos');
          },
        })
      )
      .subscribe();
  }
}
