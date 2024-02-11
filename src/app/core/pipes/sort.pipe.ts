import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a.value[field] > b.value[field]) {
        return -1;
      } else if (a.value[field] < b.value[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(array);
    return array;
  }
}
