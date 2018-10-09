import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmailDataService } from './service/email-data.service';
import { HttpClientModule } from '@angular/common/http';
import { TextSearchComponent } from './component/text-search/text-search.component';
import { AddressFilterComponent } from './component/address-filter/address-filter.component';
import { DateFilterComponent } from './component/date-filter/date-filter.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { LettersSheetComponent } from './component/letters-sheet/letters-sheet.component';
import { FiltersComponent } from './component/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    TextSearchComponent,
    AddressFilterComponent,
    DateFilterComponent,
    PaginationComponent,
    LettersSheetComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [EmailDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
