import { Component, Input, OnInit } from '@angular/core';
import { EmailDataService } from '../../service/email-data.service';
import { Letter } from '../../model/letter';

@Component({
  selector: 'eav-letters-sheet',
  templateUrl: './letters-sheet.component.html',
  styleUrls: ['./letters-sheet.component.css']
})
export class LettersSheetComponent implements OnInit {
  letters: Letter[];

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
    this.emailService.getEmails().subscribe(letters => this.letters = letters);
  }

}
