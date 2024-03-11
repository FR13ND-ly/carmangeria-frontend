import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogModule } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    DialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatRippleModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule {}
