import { Component, inject } from '@angular/core';
import { UtilsService } from '../../data-access/utils.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  utilsService = inject(UtilsService);

  news$ = this.utilsService.getNews();
}
