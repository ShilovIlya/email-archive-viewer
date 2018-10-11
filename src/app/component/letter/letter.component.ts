import {Component, Input, OnInit} from '@angular/core';
import {Letter} from '../../model/letter';

@Component({
  selector: 'eav-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  _letter: Letter;
  message: string;
  originalMessage: string;
  isOriginalMessageOpened: boolean = false;
  @Input()
  set letter(letter: Letter) {
    this._letter = letter;
    const checkSubject = letter.subject.search('RE:');
    const checkBody = letter.body.search('----- Original Message -----|-----Original Message-----');
    if (checkSubject !== -1 && checkBody !== -1) {
        this.message = letter.body.slice(0, checkBody);
        this.originalMessage = letter.body.slice(checkBody);
    } else {
      this.message = letter.body;
      this.originalMessage = '';
    }
  }
  @Input() searchText: string;

  constructor() { }

  ngOnInit() {
  }

  toggleOriginalMessage() {
    this.isOriginalMessageOpened = !this.isOriginalMessageOpened;
  }
}