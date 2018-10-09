import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'eav-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.css']
})
export class AddressFilterComponent implements OnInit {
  @Input() emails: string[];
  @Output() changeEmails = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.update(), 8000);
  }

  update() {
    this.changeEmails.emit(['renee.ratcliff@enron.com']);
  }

}
