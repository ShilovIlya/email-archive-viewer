import { Component, Input, OnInit } from '@angular/core';
import { EmailDataService } from '../../service/email-data.service';
import { Letter } from '../../model/letter';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'eav-letters-sheet',
  templateUrl: './letters-sheet.component.html',
  styleUrls: ['./letters-sheet.component.css']
})
export class LettersSheetComponent implements OnInit {
  letters: Observable<Letter[]>;

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
    this.letters = this.emailService.letters;
    this.emailService.load();
  }

}
