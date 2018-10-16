import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFilter'
})
export class AddressFilterPipe implements PipeTransform {

  transform(value: {value: string, checked: boolean}[], searchTerm: string, showChecked: boolean): {value: string, checked: boolean}[] {
    return value.filter(item => item.value.includes(searchTerm) && (showChecked ? item.checked : true));
  }

}
