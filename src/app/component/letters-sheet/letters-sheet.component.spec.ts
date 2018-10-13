import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersSheetComponent } from './letters-sheet.component';
import { TextSearchComponent } from '../text-search/text-search.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LetterComponent } from '../letter/letter.component';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { EmailDataService } from '../../service/email-data.service';

describe('LettersSheetComponent', () => {
  let component: LettersSheetComponent;
  let fixture: ComponentFixture<LettersSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LettersSheetComponent,
        TextSearchComponent,
        PaginationComponent,
        LetterComponent,
        SearchHighlightPipe
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [EmailDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
