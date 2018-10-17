import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmailDataService } from './email-data.service';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { Letter } from '../model/letter';

describe('EmailDataService', () => {
  let http: HttpTestingController;
  let service: EmailDataService;
  const emailsData = [
    {
      'from': 'testfrom@test.com',
      'to': [
        'testto1@test.com',
        'testto2@test.com'
      ],
      'cc': ['testcc@test.com'],
      'bcc': ['testbcc@test.com'],
      'subject': 'test subject',
      'body': 'test body',
      'date': '2001-12-31T06:49:42.000+0000'
    }
  ];
  const expectedData = [
    new Letter(
      'testfrom@test.com', ['testto1@test.com', 'testto2@test.com'], ['testcc@test.com'],
      ['testbcc@test.com'], 'test subject','test body', '2001-12-31T06:49:42.000+0000'
    )
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [EmailDataService]
    });
    service = TestBed.get(EmailDataService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load filtered data', () => {
    service.load();
    const req = http.expectOne('./assets/email.json');
    expect(req.request.method).toBe('GET');
    req.flush(emailsData);
    service.letters.subscribe(data => {
      expect(data).toEqual(expectedData);
    });
  });
});
