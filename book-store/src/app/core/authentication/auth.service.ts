import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../../shared/model/login/login-request';
import { SignupRequest } from '../../shared/model/signup/signup-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';
  private username: string = '';
  private role: string = '';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
    this.token = this.localStorage.retrieve('token') || '';
    this.username = this.localStorage.retrieve('username') || '';
    this.role = this.localStorage.retrieve('role') || '';
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.httpClient.post("http://localhost:8089/api/auth/register", signupRequest, { responseType: 'text' });
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post<{ token: string, username: string, role: string }>('http://localhost:8089/api/auth/login', loginRequest).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUsername(response.username);
        this.setRole(response.role);
      })
    );
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    this.localStorage.store('token', token);
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
    this.localStorage.store('username', username);
  }

  getRole(): string {
    return this.role;
  }

  setRole(role: string): void {
    this.role = role;
    this.localStorage.store('role', role);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.setToken('');
    this.setUsername('');
    this.setRole('');
    this.localStorage.clear('token');
    this.localStorage.clear('username');
    this.localStorage.clear('role');
    this.localStorage.clear('cartQuantity');
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
}
