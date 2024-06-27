import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  constructor(private _AuthService: AuthService, private toastr: ToastrService, private _Router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('id') !== null) {
      this._Router.navigate(['/subjects']);
    }
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null, [Validators.required])
  }, {validators: this.rePasswordMatch})

  rePasswordMatch(registerForm: AbstractControl): ValidationErrors | null {
    let password = registerForm.get('password');
    let rePassword = registerForm.get('rePassword');

    if(password?.value === rePassword?.value) {
      return null;
    } else {
      rePassword?.setErrors({passwordMatch: "password and rePassword don't match"});
      return {passwordMatch: "password and rePassword don't match"};
    }
  }

  submitForm(registerForm: FormGroup) {
    this._AuthService.getTeacher().subscribe((res: User) => {
      if(res.email === registerForm.get('email')?.value) {
        this.toastr.error("!هذا الحساب موجود بالفعل", "ادخل ايميل اخر");
      } else {
        this.handleAddNewStudent(registerForm);
      }
    })
  }

  private handleAddNewStudent(registerForm: FormGroup<any>) {
    this._AuthService.getAllUsers().subscribe((res: User[]) => {
      let exist = res.some(user => user.email === registerForm.get('email')?.value);
      if (exist) {
        this.toastr.error("!هذا الحساب موجود بالفعل", "ادخل ايميل اخر");
      } else {
        this.toastr.success("تم انشاء حساب جديد بنجاح");
        let user : User = {
          ...registerForm.value,
          subjects: []
        }
        this._AuthService.createUser(user).subscribe(res => {
          this._Router.navigate(['/subjects']);
          localStorage.setItem("id", res.id);
        });
      }
    });
  }
}
