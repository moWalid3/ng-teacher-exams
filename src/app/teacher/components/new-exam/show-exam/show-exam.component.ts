import { Component } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../../../../shared/interfaces/subject';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrl: './show-exam.component.scss'
})
export class ShowExamComponent {
  id: string = '';
  subject: Subject = {} as Subject;
  constructor(
    private _TeacherService: TeacherService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getSubject();
  }
  
  getId() {  
    this._ActivatedRoute.paramMap.forEach(
      (param) => (this.id = param.get('id')!)
    );
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
}
