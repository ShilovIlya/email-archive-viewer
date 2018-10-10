import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailDataService } from '../../service/email-data.service';

@Component({
  selector: 'eav-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.css']
})
export class AddressFilterComponent implements OnInit {
  @Input() emails: string[];
  @Output() changeEmails = new EventEmitter<string[]>();
  addresses: Observable<string[]>;
  selectedAddresses: string[];

  constructor(private emailService: EmailDataService) {
  }

  ngOnInit() {
    this.addresses = this.emailService.addresses;
    this.emailService.load();
  }

  onAddressesChange() {
    this.changeEmails.emit(this.selectedAddresses);
  }
}
