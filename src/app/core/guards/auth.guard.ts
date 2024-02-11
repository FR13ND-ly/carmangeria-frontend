import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../data-access/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let router = inject(Router);

  return userService.authorization().pipe(
    map((res: any) => {
      if (res.success) {
        // router.navigate(['/admin/products']);
        return true;
      } else {
        router.navigate(['/admin/login']);
        return false;
      }
    })
  );
};
