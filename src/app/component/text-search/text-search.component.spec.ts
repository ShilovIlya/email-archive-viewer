import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSearchComponent } from './text-search.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailDataService } from '../../service/email-data.service';

describe('TextSearchComponent', () => {
  let component: TextSearchComponent;
  let fixture: ComponentFixture<TextSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSearchComponent ],
      imports: [ HttpClientModule ],
      providers: [EmailDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
