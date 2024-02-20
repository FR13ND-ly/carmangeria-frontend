import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
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

  initState = {
    init: false,
    isAdmin: false,
    logged: false,
  };

  userSubject = new BehaviorSubject(this.initState);

  getUserUpdateListener() {
    return this.userSubject.asObservable();
  }

  authentification(data: any) {
    return this.http.post(`${this.apiUrl}users/authentification/`, data).pipe(
      tap((res: any) => {
        if (res.logged) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin']);
        }
      })
    );
  }

  authorization() {
    if (!isPlatformBrowser(this.platform)) return of(this.initState);
    let token = localStorage.getItem('token');
    if (!token) token = 'null';
    return this.http.get(`${this.apiUrl}users/authorization/${token}/`).pipe(
      tap((res: any) => {
        this.userSubject.next({
          init: true,
          isAdmin: res.isAdmin,
          logged: res.logged,
        });
      })
    );
  }

  logout() {
    localStorage.setItem('token', '');
    this.userSubject.next({ ...this.initState, init: true });
    this.router.navigate(['/']);
  }
}
