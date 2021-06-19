import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DecodedToken } from './decodeToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('jwt_decodedtoken')) || new DecodedToken();
  }

  register(userData: RegisterForm): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).pipe(
      map(
        (res) => {
          console.log(res);
          return this.saveToken(res['token']);
        }
      )
    );
  }

  private saveToken(token: string): string {
    this.decodedToken = helper.decodeToken(token);
    localStorage.setItem ('jwt_token', token);
    localStorage.setItem ('jwt_decodedtoken', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_decodeToken');
    this.decodedToken = new DecodedToken();
  }

  getAuthToken(): string {
    return localStorage.getItem('jwt_token');
  }

  getUsername() {
    return this.decodedToken.username;
  }
}
