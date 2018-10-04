import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Mail } from '../model/mail';
import { map, tap } from 'rxjs/internal/operators';

@Injectable()
export class EmailDataService {

  constructor(private http: HttpClient) { }

  public getEmails(): Observable<Mail[]> {
    return this.http.get<Mail[]>('./assets/email.json').pipe(
      map(mails => mails.map(mail => new Mail(mail.from, mail.to, mail.subject, mail.body, mail.date)))
    );
  }
}
