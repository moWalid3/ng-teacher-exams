import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HintAuthComponent } from './components/hint-auth/hint-auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HintAuthComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
