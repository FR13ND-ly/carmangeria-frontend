import { Component, inject } from '@angular/core';
import { HeroComponent } from './ui/hero/hero.component';
import { ProductComponent } from './feature/product/product.component';
import { ProductsService } from '../../core/data-access/products.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SectionComponent } from './ui/section/section.component';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeroComponent,
    ProductComponent,
    AsyncPipe,
    SectionComponent,
    JsonPipe,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  productsService = inject(ProductsService);

  products$: Observable<any> = this.productsService.getAll();
}
