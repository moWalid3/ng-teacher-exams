import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) {
    
    if(localStorage.getItem('id') == null) {
      
    }

  }

  createUser(user: User): Observable<any> {
    return this._HttpClient.post(`students`, user);
  }

  getAllUsers(): Observable<any> {
    return this._HttpClient.get('students');
  }

  getTeacher(): Observable<any> {
    return this._HttpClient.get('teacher');
  }


}
