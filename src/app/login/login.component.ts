import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  userLogin() {
    this.authService
      .userLogin(this.loginForm)
      .pipe(
        tap({
          next: (value) => {
            if (value) {
              this.router.navigate(['/dashboard']);
            } else {
              alert('failed');
            }
          },
          error: (error) => {
            alert('failed error'), console.log(error);
          },
        })
      )
      .subscribe();
  }
}
