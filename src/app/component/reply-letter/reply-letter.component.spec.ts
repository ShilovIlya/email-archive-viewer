import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyLetterComponent } from './reply-letter.component';
import {SearchHighlightPipe} from "../letters-sheet/search-highlight.pipe";

describe('ReplyLetterComponent', () => {
  let component: ReplyLetterComponent;
  let fixture: ComponentFixture<ReplyLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReplyLetterComponent,
        SearchHighlightPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
