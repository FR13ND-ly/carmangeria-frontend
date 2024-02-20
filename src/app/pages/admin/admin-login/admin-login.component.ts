import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/data-access/user.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../../core/data-access/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  userService = inject(UserService);
  loadingService = inject(LoadingService);
  snackbar = inject(MatSnackBar);
  router = inject(Router);

  data = {
    username: '',
    password: '',
  };

  onLogin() {
    this.loadingService.setLoading(true);
    this.userService.authentification(this.data).subscribe((res: any) => {
      this.loadingService.setLoading(false);
      if (!res.logged) {
        this.snackbar.open('Nume de utilizator sau parolă greșită', '', {
          duration: 3000,
        });
      } else this.router.navigate(['/admin']);
    });
  }
}
