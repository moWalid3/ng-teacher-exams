import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) {

  }

  createUser(user: User): Observable<any> {
    return this._HttpClient.post(`students`, user);
  }

  getAllUsers(): Observable<any> {
    return this._HttpClient.get('students');
  }

  getUser(id: string): Observable<any> {
    return this._HttpClient.get(`students/${id}`);
  }

  getTeacher(): Observable<any> {
    return this._HttpClient.get('teacher');
  }

  updateStudents(id: string, user: User): Observable<any> {
    return this._HttpClient.put(`students/${id}`, user);
  }

}
