import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { UtilsService } from '../../../../core/data-access/utils.service';
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  utilsService = inject(UtilsService);
  snackbar = inject(MatSnackBar);

  dashboard$: Observable<any> = this.utilsService.getDashboard();

  onSetEmail(email: string) {
    this.utilsService.setEmail(email).subscribe(() => {
      this.snackbar.open('Email-ul a fost modificat', '', { duration: 5000 });
    });
  }

  onSetNews(text: string) {
    this.utilsService.setNews(text).subscribe(() => {
      this.snackbar.open('Noutățile au fost modificat', '', { duration: 5000 });
    });
  }
}
