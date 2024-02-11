import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/data-access/user.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  userService = inject(UserService);
  snackbar = inject(MatSnackBar);

  data = {
    username: '',
    password: '',
  };

  onLogin() {
    this.userService.authentification(this.data).subscribe((res: any) => {
      if (!res.success)
        this.snackbar.open('Nume de utilizator sau parolă greșită', '', {
          duration: 3000,
        });
    });
  }
}
