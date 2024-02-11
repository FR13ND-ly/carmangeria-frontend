import { Component } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cart-finished',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.scss',
})
export class FinishedComponent {}
