import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterComponent } from './letter.component';
import {SearchHighlightPipe} from "../letters-sheet/search-highlight.pipe";
import { ReplyLetterComponent } from '../reply-letter/reply-letter.component';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LetterComponent,
        SearchHighlightPipe,
        ReplyLetterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
