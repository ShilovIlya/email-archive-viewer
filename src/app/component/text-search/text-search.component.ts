import {Component, OnInit} from '@angular/core';
import {EmailDataService} from '../../service/email-data.service';

@Component({
  selector: 'eav-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {
  searchTerm: string;

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
    this.searchTerm = this.emailService.searchText;
  }

  changeSearchTerm(text: string) {
    this.emailService.searchText = text;
  }
}
