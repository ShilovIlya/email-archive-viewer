import { Component, OnInit } from '@angular/core';
import { EmailDataService } from './service/email-data.service';

@Component({
  selector: 'eav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private emailDataService: EmailDataService) {
  }

  ngOnInit() {
    this.emailDataService.loading.subscribe(loading => this.loading = loading);
  }
}
