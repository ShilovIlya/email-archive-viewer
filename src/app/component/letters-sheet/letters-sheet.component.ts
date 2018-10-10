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

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
    this.letters = this.emailService.letters;
    this.pagingInfo = this.emailService.pagingInfo;
    this.emailService.load();
  }

  onChangePage(page: number) {
    this.emailService.page = page;
  }

}
