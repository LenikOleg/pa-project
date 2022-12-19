import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    let userdata = this.userInfo.getValue();
    if (!userdata) {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        userdata = await this.jwtHelper.decodeToken(access_token);
        this.userInfo.next(userdata);
      }
    }
  }
  userLogin(login: any): Observable<boolean> {
    if (login && login.username && login.password) {
      const sampleJWT =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs';

      return of(sampleJWT).pipe(
        map((token) => {
          if (!token) {
            return false;
          }
          localStorage.setItem('access_token', token);
          const decodedUser = this.jwtHelper.decodeToken(token);
          this.userInfo.next(decodedUser);
          return true;
        })
      );
    }
    return of(false);
  }

  callRefershToken(payload: any) {
    return this.http.post('http://localhost:3000/auth/refreshtoken', payload);
  }
}
