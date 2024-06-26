import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../../shared/interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private _HttpClient: HttpClient) { }

  getSubject(id: string): Observable<any> {
    return this._HttpClient.get(`subjects/${id}`);
  }

  getAllSubjects(): Observable<any> {
    return this._HttpClient.get('subjects');
  }

  setSubject(subject: Subject): Observable<any> {
    return this._HttpClient.post('subjects', subject);
  }

  updateSubject(id:string, subject: Subject): Observable<any> {
    return this._HttpClient.put(`subjects/${id}`, subject);
  }

  removeSubject(id:string): Observable<any> {
    return this._HttpClient.delete(`subjects/${id}`);
  }

  
}
