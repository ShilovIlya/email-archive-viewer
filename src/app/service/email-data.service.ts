import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import { Letter } from '../model/letter';
import { Filter } from '../model/filter';
import { PagingInfo } from '../model/pagingInfo';

@Injectable()
export class EmailDataService {
  public letters: Observable<Letter[]>;
  public addresses: Observable<string[]>;
  public pagingInfo: Observable<PagingInfo>;
  private _page: number;
  private _pageSize: number;
  private _letters: BehaviorSubject<Letter[]>;
  private _addresses: BehaviorSubject<string[]>;
  private _pagingInfo: BehaviorSubject<PagingInfo>;
  private dataStore: {
    letters: Letter[],
    addresses: string[]
  };
  private _filter: Filter;

  constructor(private http: HttpClient) {
    this._page = 1;
    this._pageSize = 10;
    this.dataStore = {letters: [], addresses: []};
    this._letters = <BehaviorSubject<Letter[]>>new BehaviorSubject([]);
    this._addresses = <BehaviorSubject<string[]>>new BehaviorSubject([]);
    const pagingInfo = new PagingInfo(0, this._pageSize, this._page);
    this._pagingInfo = <BehaviorSubject<PagingInfo>>new BehaviorSubject(pagingInfo);
    this.letters = this._letters.asObservable();
    this.addresses = this._addresses.asObservable();
    this.pagingInfo = this._pagingInfo.asObservable();
  }

  set filter(filter: Filter) {
    this._filter = filter;
    this._page = 1;
    this.filterLetters();
  }

  set page(value: number) {
    if (value !== this.page) {
      this._page = value;
    }
    this.filterLetters();
  }

  load() {
    this.http.get<Letter[]>('./assets/email.json')
      .pipe(
        map(letters => letters.map(letter => new Letter(letter.from, letter.to, letter.subject,
          letter.body, letter.date))))
      .subscribe(
        letters => {
          this.dataStore.letters = letters;
          this.filterLetters();
          this.dataStore.addresses = this.parseLettersToAddresses(letters);
          const addresses = Object.assign({}, this.dataStore).addresses;
          this._addresses.next(addresses);
        },
        error => console.log(error)
      );
  }

  filterLetters() {
    const filteredLetters = Object.assign({}, this.dataStore).letters
      .filter(this.checkEmailFilter)
      .filter(this.checkDate)
      .filter(this.checkSearchText);
    this._letters.next(this.pagingLetters(filteredLetters, this._page, this._pageSize));
    this._pagingInfo.next(new PagingInfo(filteredLetters.length, this._pageSize, this._page));
  }

  pagingLetters(letters: Letter[], page: number, pageSize: number): Letter[] {
    return letters.slice((page - 1) * pageSize, page * pageSize);
  }

  parseLettersToAddresses = letters =>
    letters
      .reduce((result, letter) => result.concat(letter.to, letter.from), [])
      .filter((value, index, array) => array.indexOf(value) === index)

  checkSearchText = (letter: Letter): boolean =>
  letter.subject.includes(this._filter.searchText) || letter.body.includes(this._filter.searchText)

  checkDate = (letter: Letter): boolean =>
  (!this._filter.dateFrom || this._filter.dateFrom <= letter.date) &&
  (!this._filter.dateTo || letter.date <= this._filter.dateTo)

  checkEmailFilter = (letter: Letter): boolean =>
  !this._filter.emails.length || this._filter.emails.includes(letter.from) ||
  letter.to.reduce((result, email) => result || this._filter.emails.includes(email), false)
}
