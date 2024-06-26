import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectNameComponent } from './components/new-exam/subject-name/subject-name.component';
import { SubjectQuestionsComponent } from './components/new-exam/subject-questions/subject-questions.component';
import { ShowExamComponent } from './components/new-exam/show-exam/show-exam.component';



@NgModule({
  declarations: [
    NewExamComponent,
    StudentsComponent,
    SubjectsComponent,
    SubjectNameComponent,
    SubjectQuestionsComponent,
    ShowExamComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeacherModule { }
