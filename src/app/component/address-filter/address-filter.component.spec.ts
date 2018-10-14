import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFilterComponent } from './address-filter.component';
import {FormsModule} from "@angular/forms";
import {EmailDataService} from "../../service/email-data.service";
import {AddressFilterPipe} from "./address-filter.pipe";
import {HttpClientModule} from "@angular/common/http";

describe('AddressFilterComponent', () => {
  let component: AddressFilterComponent;
  let fixture: ComponentFixture<AddressFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddressFilterComponent,
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
    fixture = TestBed.createComponent(AddressFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
