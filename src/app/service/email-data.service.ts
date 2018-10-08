import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map, tap } from 'rxjs/internal/operators';
import { Letter } from '../model/letter';

@Injectable()
export class EmailDataService {

  constructor(private http: HttpClient) { }

  public getEmails(): Observable<Letter[]> {
    return this.http.get<Letter[]>('./assets/email.json').pipe(
      map(letters => letters.map(letter => new Letter(letter.from, letter.to, letter.subject,
        letter.body, letter.date)))
    );
  }
}
