import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import { Letter } from '../model/letter';
import { Filter } from '../model/filter';

@Injectable()
export class EmailDataService {
  letters: Observable<Letter[]>;
  private _letters: BehaviorSubject<Letter[]>;
  private dataStore: {
    letters: Letter[]
  };
  private filter: Filter;

  constructor(private http: HttpClient) {
    this.dataStore = {letters: []};
    this._letters = <BehaviorSubject<Letter[]>>new BehaviorSubject([]);
    this.filter = new Filter('interpret', ['k..allen@enron.com', 'john.lavorato@enron.com'], '2001-09-29', '2001-11-07');
    this.letters = this._letters.asObservable();
  }

  load() {
    this.http.get<Letter[]>('./assets/email.json')
      .pipe(
        map(letters => letters.map(letter => new Letter(letter.from, letter.to, letter.subject,
          letter.body, letter.date))))
      .subscribe(
        letters => {
          this.dataStore.letters = letters;
          const filteredLetters = Object.assign({}, this.dataStore).letters
            .filter(this.checkEmailFilter)
            .filter(this.checkDate)
            .filter(this.checkSearchText);
          this._letters.next(filteredLetters);
        },
        error => console.log(error)
      );
  }

  checkSearchText = (letter: Letter): boolean =>
    letter.subject.includes(this.filter.searchText) || letter.body.includes(this.filter.searchText)

  checkDate = (letter: Letter): boolean =>
    this.filter.dateFrom <= letter.date && letter.date <= this.filter.dateTo

  checkEmailFilter = (letter: Letter): boolean =>
    this.filter.emails.includes(letter.from) ||
      letter.to.reduce((result, email) => result || this.filter.emails.includes(email), false)
}
