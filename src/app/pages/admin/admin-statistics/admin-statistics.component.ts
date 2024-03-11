import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../../../core/data-access/utils.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SortPipe } from '../../../core/pipes/sort.pipe';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SumPipe } from '../../../core/pipes/sum.pipe';

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
  imports: [SortPipe, MaterialModule, ReactiveFormsModule, SumPipe],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.scss',
})
export class AdminStatisticsComponent implements OnInit {
  utilsService = inject(UtilsService);

  interval = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  statistics: any;
  productsStats: any;
  usersStats: any;

  ngOnInit(): void {
    this.utilsService.getStatistics().subscribe((res: any) => {
      this.statistics = res;
      this.setStats(this.getStats());
    });
    this.interval.valueChanges.subscribe((res) => {
      if (!(res.start && res.end)) {
        this.setStats(this.getStats());
        return;
      }
      let stats = this.getStats();
      res.end.setDate(res.end.getDate() + 1);
      this.setStats({
        productsStats: stats.productsStats.map((el: any) => {
          el.stats = el.stats.filter((item: any) => {
            let date = new Date(item.date);
            return res.start <= date && date <= res.end;
          });
          return el;
        }),
        usersStats: stats.usersStats.map((el: any) => {
          el.stats = el.stats.filter((item: any) => {
            let date = new Date(item.date);
            return res.start <= date && date <= res.end;
          });
          return el;
        }),
      });
    });
  }

  clear() {
    this.interval.setValue({
      start: null,
      end: null,
    });
  }

  getStats() {
    return {
      productsStats: Object.entries(this.statistics.productsStats).map(
        ([key, value]: any) => {
          return {
            id: key,
            ...value,
          };
        }
      ),
      usersStats: Object.entries(this.statistics.usersStats).map(
        ([key, value]: any) => {
          return {
            id: key,
            ...value,
          };
        }
      ),
    };
  }

  setStats(stats: any) {
    stats.productsStats.map((el: any) => {
      el.orders = el.stats.length;
      el.price = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.price || 0),
        0
      );
      el.amount = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.amount || 0),
        0
      );
    });
    this.productsStats = [...stats.productsStats];
    stats.usersStats.map((el: any) => {
      el.orders = el.stats.length;
      el.price = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.price || 0),
        0
      );
      el.amount = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.amount || 0),
        0
      );
    });
    this.usersStats = [...stats.usersStats];
  }
}
