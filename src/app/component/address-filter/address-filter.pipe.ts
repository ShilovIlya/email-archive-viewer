import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFilter'
})
export class AddressFilterPipe implements PipeTransform {

  transform(value: any, searchTerm: string, showChecked: boolean): any {
    return value.filter(item => item.value.includes(searchTerm) && (showChecked ? item.checked : true));
  }

}
