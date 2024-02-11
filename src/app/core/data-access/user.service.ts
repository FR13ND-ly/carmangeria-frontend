import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { BehaviorSubject, filter, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);
  platform = inject(PLATFORM_ID);
  apiUrl = environment.apiUrl;

  constructor() {}

  authentification(data: any) {
    return this.http.post(`${this.apiUrl}users/authentification/`, data).pipe(
      tap((res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin']);
        }
      })
    );
  }

  authorization() {
    if (!isPlatformBrowser(this.platform)) return of({ success: false });
    let token = localStorage.getItem('token');
    if (!token) token = 'null';
    return this.http.get(`${this.apiUrl}users/authorization/${token}/`);
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }
}
