import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'eav-reply-letter',
  templateUrl: './reply-letter.component.html',
  styleUrls: ['./reply-letter.component.css']
})
export class ReplyLetterComponent implements OnInit {
  isReplyOpened: boolean;
  message: string;
  innerReply: string;

  @Input()
  set replyMessage(message: string) {
    this.message = message;
    const submessage = message.slice(10);
    const checkInnerReply = submessage.search('----- Original Message -----|-----Original Message-----');
    if (checkInnerReply !== -1) {
      this.message = message.slice(0, checkInnerReply + 10);
      this.innerReply = message.slice(checkInnerReply + 10);
    }
  }

  @Input() searchText: string;

  constructor() {
    this.innerReply = '';
    this.isReplyOpened = false;
  }

  ngOnInit() {
  }

  toggleReplyOpen() {
    this.isReplyOpened = !this.isReplyOpened;
  }
}
