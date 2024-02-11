import { Component, Input } from '@angular/core';
import { ProductComponent } from '../../feature/product/product.component';

@Component({
  selector: 'products-section',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() section: any;
}
