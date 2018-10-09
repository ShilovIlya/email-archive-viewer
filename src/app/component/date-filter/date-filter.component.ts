import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'eav-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  @Input() dateFrom: string;
  @Input() dateTo: string;
  @Output() onChangeDateFrom = new EventEmitter<string>();
  @Output() onChangeDateTo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
