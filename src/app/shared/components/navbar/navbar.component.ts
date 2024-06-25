import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {}

  isLogin(): boolean {
    if (localStorage.getItem('id') !== null) {
      return true;
    }
    return false;
  }

  isAdmin() {
    if (localStorage.getItem('id') === '1') {
      return true;
    }
    return false;
  }

  handleLogout() {
    localStorage.removeItem('id');
  }
}
