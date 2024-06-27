import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { Subject } from '../../../shared/interfaces/subject';
import { User } from '../../../shared/interfaces/user';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  allSubjects: string[] = ['كل المواد'];
  chosenSubject: string = 'كل المواد';
  allStudents: User[] = [];
  constructor(
    private _TeacherService: TeacherService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSubjects();
    this.getStudents();
  }

  getSubjects() {
    this._TeacherService.getAllSubjects().subscribe((res: Subject[]) => {
      res.forEach(subject => this.allSubjects.push(subject.name));
    })
  }

  getStudents() {
    this._AuthService.getAllUsers().subscribe(res => this.allStudents = res);
  }



}
