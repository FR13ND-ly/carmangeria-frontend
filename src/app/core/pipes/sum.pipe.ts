import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  standalone: true,
})
export class SumPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    return array.reduce((sum: any, obj: any) => sum + (obj[field] || 0), 0);
  }
}
