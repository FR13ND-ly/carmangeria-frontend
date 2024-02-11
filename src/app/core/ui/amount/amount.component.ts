import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../feature/material/material.module';

@Component({
  selector: 'app-amount',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss',
})
export class AmountComponent {
  @Input() amount: any;
  @Output() amountChange = new EventEmitter();

  onChangeAmount(i: any) {
    if (i) this.amount++;
    else if (this.amount > 1) this.amount--;
    this.amountChange.emit(this.amount);
  }
}
