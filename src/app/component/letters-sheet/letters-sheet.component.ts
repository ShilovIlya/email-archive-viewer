import { Component, Input, OnInit } from '@angular/core';
import { EmailDataService } from '../../service/email-data.service';
import { Letter } from '../../model/letter';
import { Observable } from 'rxjs/index';
import { PagingInfo } from '../../model/pagingInfo';

@Component({
  selector: 'eav-letters-sheet',
  templateUrl: './letters-sheet.component.html',
  styleUrls: ['./letters-sheet.component.css']
})
export class LettersSheetComponent implements OnInit {
  letters: Observable<Letter[]>;
  pagingInfo: Observable<PagingInfo>;
  searchText: string;
  isSettingsOpen = false;
  hideLetterBodies = false;
  pagingVariants = [];
  selectedPageSizeVariant: number;

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
    this.letters = this.emailService.letters;
    this.pagingInfo = this.emailService.pagingInfo;
    this.emailService.load();
    this.searchText = this.emailService.searchText;
    this.pagingVariants = [10, 20, 50];
    this.selectedPageSizeVariant = 10;
  }

  onChangePage(page: number) {
    this.emailService.page = page;
  }

  onSearchText(text: string) {
    this.searchText = text;
  }

  changePageSize() {
    this.emailService.pageSize = this.selectedPageSizeVariant;
  }
}
