import { Component, OnInit } from '@angular/core';
import { Filter } from '../../model/filter';
import { EmailDataService } from '../../service/email-data.service';

@Component({
  selector: 'eav-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filter: Filter;
  areFiltersOpen: boolean;

  constructor(private emailService: EmailDataService) {
    this.areFiltersOpen = true;
  }

  ngOnInit() {
    this.filter = this.emailService.filter;
  }

  onChangeEmails(emails: string[]) {
    this.filter.emails = emails;
    this.updateFilter();
  }

  onChangeDateFrom(dateFrom: string) {
    this.filter.dateFrom = dateFrom;
    this.updateFilter();
  }

  onChangeDateTo(dateTo: string) {
    this.filter.dateTo = dateTo;
    this.updateFilter();
  }

  updateFilter() {
    this.emailService.filter = this.filter;
  }

  moveFilters() {
    this.areFiltersOpen = !this.areFiltersOpen;
  }

}
