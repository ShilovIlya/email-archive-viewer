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

  changeInputDateFrom(date: string) {
    if (this.initDateTo !== '' && date > this.initDateTo) {
      this.dateTo = date;
      this.changeDateTo.emit(date);
    }
    this.changeDateFrom.emit(date);
  }

  changeInputDateTo(date: string) {
    if (this.initDateFrom !== '' && date < this.initDateFrom) {
      this.dateFrom = date;
      this.changeDateFrom.emit(date);
    }
    this.changeDateTo.emit(date);
  }
}
