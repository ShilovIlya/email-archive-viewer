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
  private _filter: Filter;

  constructor(private http: HttpClient) {
    this.dataStore = {letters: []};
    this._letters = <BehaviorSubject<Letter[]>>new BehaviorSubject([]);
    this._filter = new Filter('', [], '', '');
    this.letters = this._letters.asObservable();
  }

  set filter(filter: Filter) {
    this._filter = filter;
    this.load();
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
    letter.subject.includes(this._filter.searchText) || letter.body.includes(this._filter.searchText)

  checkDate = (letter: Letter): boolean =>
    (!this._filter.dateFrom || this._filter.dateFrom <= letter.date)
    && (!this._filter.dateTo || letter.date <= this._filter.dateTo)

  checkEmailFilter = (letter: Letter): boolean =>
    !this._filter.emails.length || this._filter.emails.includes(letter.from)
    || letter.to.reduce((result, email) => result || this._filter.emails.includes(email), false)
}
