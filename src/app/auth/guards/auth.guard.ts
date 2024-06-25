import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('id') !== null) {
    return true;
  } else {
    const _Router = inject(Router);
    _Router.navigate(['/login']);
    return false;
  }
};
