import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";



export interface LoginData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string;
  private token: string;

  constructor(private http: HttpClient) {}

  private saveToken(token): void {
    localStorage.setItem('auth', JSON.stringify(token));
  }

  private parseJwt(token) {
    if (token) {

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      console.log('base64Url', base64Url);
      console.log('base64', base64);
      debugger;
      return JSON.parse(window.atob(base64));
    }
    return {};
  }

  private getToken(): string {
    
    console.log('gettoken', this.token);
    if(this.token) {
      return this.token;
    }

    if(this.isAuthenticated()) {
      // console.log('token', this.token);
      console.log('localstorage', localStorage.getItem('auth'));
      return this.token = JSON.parse(localStorage.getItem('auth')).auth;
    }
    return '';
  }

  public login(loginData: LoginData): Observable<any> {
    console.log('login', loginData);
    return this.http.post('/api/v1/auth', loginData)
      .pipe(map((token: any) => this.saveToken(token)));
  }

  public logout(): Observable<any> {
    localStorage.removeItem('auth');
    localStorage.removeItem('meta');
    this.token = '';
    this.username = '';

    return new Observable(observer => {
      if(!!localStorage.getItem('auth')) {
        observer.error(new Error('Token was not removed'));
      } else {
        observer.next();
      }
    });
  }

  public register(user: User): Observable<any> {
    return this.http.post('/api/v1/users', user);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('auth');
  }

  public getUsername(): string {
    if(this.username) {
      return this.username;
    } else {
      console.error('Unable to get username');
    }
    return this.username = this.parseJwt(this.getToken()).username;
  }

  public getAuthToken() {
    const auth = localStorage.getItem('auth');
    return auth ? `Bearer ${JSON.parse(auth).token}` : '';
  }
  public getUser(userId: string): Observable<any> {
    return this.http.get(`/api/v1/users/${userId}`);
  }
}
