import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'eav-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  dateFrom: string;
  dateTo: string;
  today: string;
  @Input() initDateFrom: string;
  @Input() initDateTo: string;
  @Output() changeDateFrom = new EventEmitter<string>();
  @Output() changeDateTo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.dateFrom = this.initDateFrom;
    this.dateTo = this.initDateTo;
    this.today = new Date().toJSON().split('T')[0];
  }

  changeInputDateFrom(event) {
    if (this.initDateTo !== '' && event.target.value > this.initDateTo) {
      this.dateTo = event.target.value;
      this.changeDateTo.emit(event.target.value);
    }
    this.changeDateFrom.emit(event.target.value);
  }

  changeInputDateTo(event) {
    if (this.initDateFrom !== '' && event.target.value < this.initDateFrom) {
      this.dateFrom = event.target.value;
      this.changeDateFrom.emit(event.target.value);
    }
    this.changeDateTo.emit(event.target.value);
  }
}
