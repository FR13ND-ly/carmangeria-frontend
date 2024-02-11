import { Component, inject } from '@angular/core';
import { UtilsService } from '../../../core/data-access/utils.service';
import { AsyncPipe, JsonPipe, KeyValuePipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { SortPipe } from '../../../core/pipes/sort.pipe';

export interface statistics {
  productsStats: {
    [key: string]: any;
  };
  usersStats: {
    [key: string]: any;
  };
}

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, KeyValuePipe, SortPipe],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.scss',
})
export class AdminStatisticsComponent {
  utilsService = inject(UtilsService);

  statistics$: Observable<statistics> = <any>this.utilsService.getStatistics();
}
