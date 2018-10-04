import { Component, OnInit } from '@angular/core';
import { EmailDataService } from './service/email-data.service';
import { Mail } from './model/mail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mails: Mail[];

  constructor(private emailService: EmailDataService) {
  }

  ngOnInit() {
    this.emailService.getEmails().subscribe(mails => this.mails = mails);
  }
}
