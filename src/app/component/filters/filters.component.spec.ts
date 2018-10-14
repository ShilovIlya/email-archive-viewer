import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import {AddressFilterComponent} from "../address-filter/address-filter.component";
import {HttpClientModule} from "@angular/common/http";
import {EmailDataService} from "../../service/email-data.service";
import {DateFilterComponent} from "../date-filter/date-filter.component";
import {FormsModule} from "@angular/forms";
import {LetterComponent} from "../letter/letter.component";
import {AddressFilterPipe} from "../address-filter/address-filter.pipe";

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltersComponent,
        AddressFilterComponent,
        DateFilterComponent,
        AddressFilterPipe
      ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [EmailDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
