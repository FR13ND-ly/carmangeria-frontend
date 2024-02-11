import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'api/';

  addFile(e: any) {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}files/add/`, formData);
  }
}
