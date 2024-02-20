import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../data-access/user.service';
import { map, tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let router = inject(Router);

  return userService.getUserUpdateListener().pipe(
    tap((res: any) => {
      if (!res.isAdmin) router.navigate(['admin', 'orders']);
    }),
    map((res: any) => res.isAdmin)
  );
};
