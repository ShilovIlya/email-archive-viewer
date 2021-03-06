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
  public loading: Observable<boolean>;
  private _page: number;
  private _pageSize: number;
  private _letters: BehaviorSubject<Letter[]>;
  private _addresses: BehaviorSubject<string[]>;
  private _pagingInfo: BehaviorSubject<PagingInfo>;
  private _loading: BehaviorSubject<boolean>;
  private dataStore: {
    letters: Letter[],
    filteredLetters: Letter[],
    addresses: string[]
  };
  private _filter: Filter;
  private _searchText: string;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('dataFilter')) {
      const filterData = JSON.parse(sessionStorage.getItem('dataFilter'));
      this._filter = new Filter(filterData.emails, filterData.dateFrom, filterData.dateTo);
      this._searchText = filterData.searchText;
    } else {
      this._filter = new Filter([], '', '');
      this._searchText = '';
    }
    this._page = 1;
    this._pageSize = 20;
    this.dataStore = {letters: [], filteredLetters: [], addresses: []};
    this._letters = <BehaviorSubject<Letter[]>>new BehaviorSubject([]);
    this._addresses = <BehaviorSubject<string[]>>new BehaviorSubject([]);
    const pagingInfo = new PagingInfo(0, this._pageSize, this._page);
    this._pagingInfo = <BehaviorSubject<PagingInfo>>new BehaviorSubject(pagingInfo);
    this._loading = <BehaviorSubject<boolean>>new BehaviorSubject<boolean>(false);
    this.letters = this._letters.asObservable();
    this.addresses = this._addresses.asObservable();
    this.pagingInfo = this._pagingInfo.asObservable();
    this.loading = this._loading.asObservable();
  }

  set filter(filter: Filter) {
    this._filter = filter;
    this._loading.next(true);
    this.updateSessionStorage();
    this._page = 1;
    this.filterLetters();
    this.emitData();
    this._loading.next(false);
  }

  get filter() {
    return this._filter;
  }

  set searchText(text: string) {
    this._searchText = text;
    this._loading.next(true);
    this.updateSessionStorage();
    this._page = 1;
    this.filterLetters();
    this.emitData();
    this._loading.next(false);
  }

  get searchText() {
    return this._searchText;
  }

  set pageSize(size: number) {
    if (this._pageSize !== size) {
      this._pageSize = size;
      this._page = 1;
      this.emitData();
    }
  }

  set page(value: number) {
    if (value !== this.page) {
      this._page = value;
    }
    this.emitData();
  }

  get page() {
    return this._page;
  }

  load() {
    this._loading.next(true);
    this.http.get<Letter[]>('./assets/email.json')
      .pipe(
        map(letters => letters.map(this.constructLetter)))
      .subscribe(
        letters => {
          this.dataStore.letters = letters;
          this.parseAddresses();
          this._addresses.next([...this.dataStore.addresses]);
          this.filterLetters();
          this.emitData();
          this._loading.next(false);
        },
        error => {
          console.log(error);
          this._loading.next(false);
        }
      );
  }

  private filterLetters() {
    this.dataStore.filteredLetters = [...this.dataStore.letters]
      .filter(this.checkEmailFilter)
      .filter(this.checkDate)
      .filter(this.checkSearchText);
  }

  private parseAddresses() {
    this.dataStore.addresses = this.dataStore.letters
      .reduce((result, letter) => result.concat(letter.to, letter.from), [])
      .filter((value, index, array) => array.indexOf(value) === index);
  }

  private emitData() {
    this._letters.next(this.dataStore.filteredLetters.slice((this._page - 1) * this._pageSize, this._page * this._pageSize));
    this._pagingInfo.next(new PagingInfo(this.dataStore.filteredLetters.length, this._pageSize, this._page));
  }

  private constructLetter = (letter: Letter) => new Letter(letter.from, letter.to, letter.cc, letter.bcc,
    letter.subject, letter.body, letter.date)

  private checkSearchText = (letter: Letter): boolean =>
  letter.subject.toLowerCase().includes(this._searchText.toLowerCase()) ||
    letter.body.toLowerCase().includes(this._searchText.toLowerCase())

  private checkDate = (letter: Letter): boolean => {
    const dateTo = new Date(this._filter.dateTo);
    dateTo.setDate(dateTo.getDate() + 1);
    return (!this._filter.dateFrom || this._filter.dateFrom <= letter.date) &&
      (!this._filter.dateTo || new Date(letter.date) <= dateTo);
  }

  private checkEmailFilter = (letter: Letter): boolean =>
  !this._filter.emails.length || this._filter.emails.includes(letter.from) ||
  letter.to.reduce((result, email) => result || this._filter.emails.includes(email), false)

  private updateSessionStorage() {
    const filterData = JSON.stringify({
      emails: this._filter.emails,
      dateFrom: this._filter.dateFrom,
      dateTo: this._filter.dateTo,
      searchText: this._searchText
    });
    sessionStorage.setItem('dataFilter', filterData);
  }
}
