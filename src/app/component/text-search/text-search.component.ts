import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'eav-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {
  searchTerm: string;
  @Input() searchText: string;
  @Output() changeSearchText = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.searchTerm = this.searchText;
  }

  changeSearchTerm(text: string) {
    this.changeSearchText.emit(text);
  }
}
