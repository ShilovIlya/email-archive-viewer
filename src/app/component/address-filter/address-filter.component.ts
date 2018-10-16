import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailDataService } from '../../service/email-data.service';
import { AddressFilterPipe } from "./address-filter.pipe";

@Component({
  selector: 'eav-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.css']
})
export class AddressFilterComponent implements OnInit {
  @Input() emails: string[];
  @Output() changeEmails = new EventEmitter<string[]>();
  addresses: {value: string, checked: boolean}[];
  addressSearch: string;
  showChecked: boolean;

  constructor(private emailService: EmailDataService) {
    this.addresses = [];
    this.addressSearch = '';
    this.showChecked = false;
  }

  ngOnInit() {
    const data = sessionStorage.getItem('dataFilter');
    const savedFilteredEmails = data ? JSON.parse(data).emails : false;
    this.emailService.addresses.subscribe(addresses => {
      this.addresses = addresses.sort()
        .map(address => {
          return {'value': address, 'checked': savedFilteredEmails && savedFilteredEmails.includes(address)};
        });
    });
    this.emailService.load();
  }

  onAddressesChange() {
    this.changeEmails.emit(this.addresses.filter(address => address.checked).map(address => address.value));
  }

  unselectAll() {
    this.selectAddresses(false);
  }
  selectAll() {
    this.selectAddresses(true);
  }

  selectAddresses(select: boolean) {
    const pipe = new AddressFilterPipe();
    const filteredAddresses = pipe.transform(this.addresses, this.addressSearch, this.showChecked).map(address => address.value);
    this.addresses = this.addresses.map(address =>
      filteredAddresses.includes(address.value) ? {value: address.value, checked: select} : address);
    this.onAddressesChange();
  }
}
