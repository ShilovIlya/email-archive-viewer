import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FiltersComponent } from './component/filters/filters.component';
import { LettersSheetComponent } from './component/letters-sheet/letters-sheet.component';
import { AddressFilterComponent } from './component/address-filter/address-filter.component';
import { DateFilterComponent } from './component/date-filter/date-filter.component';
import { LetterComponent } from './component/letter/letter.component';
import { TextSearchComponent } from './component/text-search/text-search.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { SearchHighlightPipe } from './component/letters-sheet/search-highlight.pipe';
import { EmailDataService } from './service/email-data.service';
import { AddressFilterPipe } from './component/address-filter/address-filter.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TextSearchComponent,
        AddressFilterComponent,
        DateFilterComponent,
        PaginationComponent,
        LettersSheetComponent,
        FiltersComponent,
        SearchHighlightPipe,
        LetterComponent,
        AddressFilterPipe
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [EmailDataService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
