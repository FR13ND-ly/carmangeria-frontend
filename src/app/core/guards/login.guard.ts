import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../data-access/user.service';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let router = inject(Router);

  return userService.authorization().pipe(
    map((res: any) => {
      if (!res.success) {
        return true;
      } else {
        router.navigate(['/admin']);
        return false;
      }
    })
  );
};
