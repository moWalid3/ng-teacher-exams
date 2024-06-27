import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Choices, Subject } from '../../../shared/interfaces/subject';
import { TeacherService } from '../../../teacher/services/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit{
  user: User = {} as User;
  id: string = '';
  subject: Subject = {} as Subject;
  studentAnswers: Choices[] = [];
  isAdmin: boolean = false; 
  choices: Choices[] = ['A', 'B', 'C', 'D'];
  degree: string = '';
  finish: boolean = false;

  constructor(
    private _TeacherService: TeacherService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('id') === '1') this.isAdmin = true;

    this.getId();

    this.getSubject(); // then getUser() then checkFinishedBefore()
  }
  
  getId() {  
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id')!;
  }
  
  getSubject() {
    this._TeacherService.getSubject(this.id).subscribe((res: Subject) => {
      this.subject = res;
      
      if(!this.isAdmin){
        this.getUser();
      }
    });
  }

  getUser() {
    let userId: string = localStorage.getItem('id')!;
    this._AuthService.getUser(userId).subscribe(res => {
      this.user = res;

      this.checkFinishedBefore();
    });
  }

  checkFinishedBefore () {
    this.user.subjects?.forEach((sub, i) => {
      if(sub.id === this.subject.id) {
        this.toastr.info("تم انهاء هذا الاختبار سابقا")

        this.handleFinishedBefore(i);
      }
    })
  }

  handleFinishedBefore(subjectIndex: number) {
    this.finish = true;
    this.studentAnswers = this.user.subjects[subjectIndex].studentAnswers;
    this.degree = this.user.subjects[subjectIndex].degree;
  }

  onDelete(index : number) {
    this.subject.questions.splice(index, 1);
    this._TeacherService.updateSubject(this.id, this.subject).subscribe();
    this.toastr.success("تم حذف السؤال بنجاح");
  }
  
  onCancel() {
    this.toastr.success("تم حذف الاختبار بنجاح");
    this._TeacherService.removeSubject(this.id).subscribe();
  }
  
  studentSubmit() {
    if(this.studentAnswers.length < this.subject.questions.length) {
      this.toastr.error("اجب عن جميع الاسئله");
    } else {
      this.toastr.success("تم انهاء الاختبار بنجاح");
      this.finish = true;

      this.getDegree();
      this.setSubjectToUser();
    }
  }

  private setSubjectToUser() {
    this.user.subjects?.push({
      id: this.id,
      degree: this.degree,
      name: this.subject.name,
      studentAnswers: this.studentAnswers
    });
    this._AuthService.updateStudents(this.user.id, this.user).subscribe();
  }

  private getDegree() {
    let numberOfCorrectAnswers = 0;

    this.subject.questions.forEach((question, i) => {
      if (question.correctAnswer === this.studentAnswers[i]) {
        numberOfCorrectAnswers++;
      }
    });
    this.degree = `${this.studentAnswers.length} / ${numberOfCorrectAnswers}`;
  }
}
