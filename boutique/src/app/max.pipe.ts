import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'max'
})
export class MaxPipe implements PipeTransform {
  transform(items: any[], searchParam: number): any[] {

    if (!items) {
      return [];
    }
    if (!searchParam) {
      return items;
    }
    //searchParam = searchParam.toLocaleLowerCase();

    return items.filter(it => {
      return it.price <= searchParam;
    });
  }
}