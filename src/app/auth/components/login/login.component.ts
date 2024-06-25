import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private toastr: ToastrService, private _Router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('id') !== null) {
      if(localStorage.getItem('id') === '1') {
        this._Router.navigate(['/students']);
      } else {
        this._Router.navigate(['/subjects']);
      }
    }
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  submitForm(loginForm: FormGroup) {
    this._AuthService.getTeacher().subscribe((res: User) => {
      if(res.email === loginForm.get('email')?.value && res.password == loginForm.get('password')?.value) {
        this.toastr.success("تم تسجيل الدخول بنجاح");
        localStorage.setItem('id', res.id);
        this._Router.navigate(['/students'])
      } else {
        this.handleLoginStudent(loginForm);
      }
    })
  }

  private handleLoginStudent(loginForm: FormGroup) {
    this._AuthService.getAllUsers().subscribe((res: User[]) => {
      let index = res.findIndex(user => user.email === loginForm.get('email')?.value && user.password === loginForm.get('password')?.value);
      if(index !== -1) {
        this.toastr.success("تم تسجيل الدخول بنجاح");
        localStorage.setItem('id', res[index].id);
        this._Router.navigate(['/subjects'])
      } else {
        this.toastr.error("الايميل أو كلمة المرور غير صحيح");
      }
    })
  }
}
