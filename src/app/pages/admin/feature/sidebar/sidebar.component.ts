import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../core/data-access/user.service';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MaterialModule, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userService = inject(UserService);

  isAdmin$ = this.userService
    .getUserUpdateListener()
    .pipe(map((res) => res.isAdmin));

  onLogout() {
    this.userService.logout();
  }
}
