import { Component } from '@angular/core';
import { Choices, Subject } from '../../../shared/interfaces/subject';
import { TeacherService } from '../../../teacher/services/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
  id: string = '';
  subject: Subject = {} as Subject;
  choices: Choices[] = ['A', 'B', 'C', 'D'];
  studentAnswers: Choices[] = [];
  isAdmin: boolean = false; 
  constructor(
    private _TeacherService: TeacherService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getSubject();

    if(localStorage.getItem('id') === '1') this.isAdmin = true;
  }
  
  getId() {  
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id')!;
  }
  
  getSubject() {
    this._TeacherService.getSubject(this.id).subscribe((res: Subject) => this.subject = res);
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
      
    }
  }
}
