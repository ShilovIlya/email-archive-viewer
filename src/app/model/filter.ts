export class Filter {
  constructor(public searchText: string,
              public emails: string[],
              public dateFrom: string,
              public dateTo: string) {
  }
}
