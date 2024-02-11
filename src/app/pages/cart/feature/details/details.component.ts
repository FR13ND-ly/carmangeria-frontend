import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cart-details',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  @Input() data: any;
}
