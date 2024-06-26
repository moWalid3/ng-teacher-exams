import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../../shared/interfaces/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit{
  allSubjects: Subject[] = [];
  isAdmin: boolean = false;
  constructor(
    private _TeacherService: TeacherService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();

    if(localStorage.getItem('id') === '1') this.isAdmin = true;
  }

  getAllSubjects() {
    this._TeacherService.getAllSubjects().subscribe(res => this.allSubjects = res)
  }

  onDelete(id: string) {
    this.allSubjects = this.allSubjects.filter(subject => subject.id !== id);
    this._TeacherService.removeSubject(id).subscribe();
    this.toastr.success("تم حذف الاختبار بنجاح");
  }
}
