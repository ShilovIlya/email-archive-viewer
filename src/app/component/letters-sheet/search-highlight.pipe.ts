import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight'
})
export class SearchHighlightPipe implements PipeTransform {
  transform(value: string, args: any): any {
    if (!args.length) {
      return value;
    }
    const re = new RegExp(args.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return value.replace(re, '<mark>$&</mark>');
  }

}
