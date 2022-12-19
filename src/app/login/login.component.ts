import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    userName: [null],
    password: [null],
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  userLogin() {
    this.authService
      .userLogin(this.loginForm.value)
      .pipe(
        tap({
          next: (value: any) => {
            if (value) {
              this.router.navigate(['/dashboard']);
            } else {
              alert('Не верный логин/пароль');
            }
          },
          error: (error: any) => {
            alert('Не верный логин/пароль'), console.log(error);
          },
        })
      )
      .subscribe();
  }
}
