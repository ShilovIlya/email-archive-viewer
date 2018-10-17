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
  replyMessage: string;
  hideBody: boolean;

  @Input()
  set hide(flag: boolean) {
    this.hideBody = flag;
  }

  @Input()
  set letter(letter: Letter) {
    this._letter = letter;
    const checkSubject = letter.subject.search('RE:');
    const checkBody = letter.body.search('----- Original Message -----|-----Original Message-----');
    if (checkSubject !== -1 && checkBody !== -1) {
      this.message = letter.body.slice(0, checkBody);
      this.replyMessage = letter.body.slice(checkBody);
    } else {
      this.message = letter.body;
      this.replyMessage = '';
    }
  }

  @Input() searchText: string;

  constructor() {
    this.hideBody = false;
  }

  ngOnInit() {
  }

  toggleHideBody() {
    this.hideBody = !this.hideBody;
  }
}
