import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { ProductEditorDialogComponent } from './feature/product-editor-dialog/product-editor-dialog.component';
import { ProductsService } from '../../../core/data-access/products.service';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { SectionComponent } from './ui/section/section.component';
import { LoadingService } from '../../../core/data-access/loading.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [AsyncPipe, MaterialModule, SectionComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit {
  productsService = inject(ProductsService);
  dialog = inject(Dialog);
  loadingService = inject(LoadingService);

  products$: Observable<any> = this.productsService
    .getAll()
    .pipe(tap(() => this.loadingService.setLoading(false)));

  ngOnInit(): void {
    this.loadingService.setLoading(true);
  }

  onAddProduct() {
    let product = {
      new: true,
      title: '',
      description: '',
      price: '',
      imageId: '',
      type: 'Produse afumate',
    };
    let dialog = this.dialog.open(ProductEditorDialogComponent, {
      data: product,
    });
    dialog.closed.subscribe(
      () => (this.products$ = this.productsService.getAll())
    );
  }

  onAction() {
    this.products$ = this.productsService.getAll();
  }
}
