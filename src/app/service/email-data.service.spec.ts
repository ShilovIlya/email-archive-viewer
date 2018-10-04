import { TestBed, inject } from '@angular/core/testing';

import { EmailDataService } from './email-data.service';

describe('EmailDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailDataService]
    });
  });

  it('should be created', inject([EmailDataService], (service: EmailDataService) => {
    expect(service).toBeTruthy();
  }));
});
