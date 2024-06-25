import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('id') === '1') {
    return true;
  } else {
    const _Router = inject(Router);
    _Router.navigate(['/subjects']);
    return false;
  }
};
