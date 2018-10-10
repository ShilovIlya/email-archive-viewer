import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmailDataService} from '../../service/email-data.service';

@Component({
  selector: 'eav-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {
  searchTerm: string;
  @Output() searchText = new EventEmitter<string>();

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
    this.searchTerm = this.emailService.searchText;
  }

  changeSearchTerm(text: string) {
    this.emailService.searchText = text;
    this.searchText.emit(text);
  }
}
