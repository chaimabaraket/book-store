import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/model/user/user';
import { LocalStorageService } from 'ngx-webstorage';
import { PasswordDto } from '../../../shared/model/user/passwordDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8089/api/user';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {}

  private getHeaders(): HttpHeaders {
    const token = this.localStorage.retrieve('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
       "responseType": 'text' 
    });
  }

  getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateUserInfo(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/update`, user, { headers: this.getHeaders() });
  }

  updatePassword(passwordDto: PasswordDto): Observable<PasswordDto> {
    return this.httpClient.post<PasswordDto>(`${this.apiUrl}/changePassword`, passwordDto, { headers: this.getHeaders() });
  }
}
