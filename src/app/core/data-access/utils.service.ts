import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'api/';

  getDashboard() {
    return this.http.get(`${this.apiUrl}dashboard/`);
  }

  setEmail(email: string) {
    return this.http.get(`${this.apiUrl}email/set/${email}/`);
  }

  getStatistics() {
    return this.http.get(`${this.apiUrl}statistics/`);
  }

  getNews() {
    const cacheBuster = `?cacheBuster=${new Date().getTime()}`;
    return this.http.get(`${this.apiUrl}news/get/${cacheBuster}`);
  }

  setNews(text: string) {
    return this.http.get(`${this.apiUrl}news/set/${text}/`);
  }
}
