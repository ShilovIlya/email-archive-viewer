import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'eav-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {
  @Input() searchText: string;
  @Output() changeSearchText = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  changeSearchTerm(text) {
    this.changeSearchText.emit(text);
  }
}
