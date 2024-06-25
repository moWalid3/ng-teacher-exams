import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { StudentsComponent } from './teacher/components/students/students.component';
import { authGuard } from './auth/guards/auth.guard';
import { SubjectsComponent } from './teacher/components/subjects/subjects.component';
import { NewExamComponent } from './teacher/components/new-exam/new-exam.component';
import { teacherGuard } from './auth/guards/teacher.guard';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'subjects', canActivate: [authGuard], component: SubjectsComponent},
  {path: 'students', canActivate: [authGuard, teacherGuard], component: StudentsComponent},
  {path: 'new-exam', canActivate: [authGuard, teacherGuard], component: NewExamComponent},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
