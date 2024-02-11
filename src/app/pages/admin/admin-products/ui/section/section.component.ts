import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../../../core/feature/material/material.module';
import { ProductsService } from '../../../../../core/data-access/products.service';
import { Dialog } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { ProductEditorDialogComponent } from '../../feature/product-editor-dialog/product-editor-dialog.component';

@Component({
  selector: 'products-section',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() section: any;
  @Output() action = new EventEmitter();
  productsService = inject(ProductsService);
  dialog = inject(Dialog);

  onEdit(product: any) {
    console.log(product);
    let dialog = this.dialog.open(ProductEditorDialogComponent, {
      data: { ...product, new: false },
    });
    dialog.closed.subscribe(() => this.action.emit());
  }

  onDelete(productId: number) {
    if (!confirm('Ești sigur')) return;
    this.productsService
      .deleteProduct(productId)
      .subscribe(() => this.action.emit());
  }
}
