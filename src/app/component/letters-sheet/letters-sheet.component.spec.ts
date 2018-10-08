import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersSheetComponent } from './letters-sheet.component';

describe('LettersSheetComponent', () => {
  let component: LettersSheetComponent;
  let fixture: ComponentFixture<LettersSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersSheetComponent ]
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
