import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchParam: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchParam) {
      return items;
    }
    searchParam = searchParam.toLocaleLowerCase();

    return items.filter(it => {
      return it.title.toLocaleLowerCase().includes(searchParam);
    });
  }
}