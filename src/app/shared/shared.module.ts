import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { baseUrlInterceptor } from './interseptors/base-url.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './components/notfound/notfound.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      preventDuplicates: true,
      closeButton: true,
    }), 
  ],
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
  ],
  exports: [
    NavbarComponent,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ]
})
export class SharedModule { }
