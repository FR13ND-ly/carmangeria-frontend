import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilesService } from '../../../../../core/data-access/files.service';
import { ProductsService } from '../../../../../core/data-access/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-editor-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-editor-dialog.component.html',
  styleUrl: './product-editor-dialog.component.scss',
})
export class ProductEditorDialogComponent {
  filesService = inject(FilesService);
  productsService = inject(ProductsService);
  snackbar = inject(MatSnackBar);
  dialog = inject(Dialog);
  product = inject(DIALOG_DATA);

  onFinish() {
    if (!this.product.title) {
      this.snackbar.open('Numele produsul e obligatoriu', '', {
        duration: 3000,
      });
      return;
    }
    if (!this.product.price) {
      this.snackbar.open('Prețul e obligatoriu', '', {
        duration: 3000,
      });
      return;
    }
    if (!this.product.imageId) {
      this.snackbar.open('Imaginea e obligatorie', '', {
        duration: 3000,
      });
      return;
    }
    if (this.product.new) {
      this.productsService.addProduct(this.product).subscribe(() => {
        this.snackbar.open('Produsul a fost adăugat', '', {
          duration: 5000,
        });
        this.dialog.closeAll();
      });
    } else {
      this.productsService.updateProduct(this.product).subscribe(() => {
        this.snackbar.open('Produsul a fost actualizat', '', {
          duration: 5000,
        });
        this.dialog.closeAll();
      });
    }
  }

  onUploadFile(e: any) {
    this.filesService.addFile(e).subscribe((imageId: any) => {
      this.snackbar.open('Imaginea a fost încărcată', '', {
        duration: 5000,
      });
      this.product.imageId = imageId;
    });
  }
}
