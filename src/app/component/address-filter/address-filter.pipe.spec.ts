import { AddressFilterPipe } from './address-filter.pipe';

describe('AddressFilterPipe', () => {
  const pipe = new AddressFilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform [{value:"ccaab", checked: true}, {value:"ddaab", checked: false}, ' +
    '{value:"ccqqb", checked: true}] by search "aa" and show only checked to ' +
    '[{value:"ccaab", checked: true}]', () => {
    const emails = [
      {value: 'ccaab', checked: true},
      {value: 'ddaab', checked: false},
      {value: 'ccqqb', checked: true}
    ];
    const expectedEmails = [
      {value: 'ccaab', checked: true}
    ];
    expect(pipe.transform(emails, 'aa', true)).toEqual(expectedEmails);
  });

  it('transform [{value:"ccaab", checked: true}, {value:"ddaab", checked: false}, ' +
    '{value:"ccqqb", checked: true}] by search "aa" and show not only checked to ' +
    '[{value:"ccaab", checked: true}]', () => {
    const emails = [
      {value: 'ccaab', checked: true},
      {value: 'ddaab', checked: false},
      {value: 'ccqqb', checked: true}
    ];
    const expectedEmails = [
      {value: 'ccaab', checked: true},
      {value: 'ddaab', checked: false}
    ];
    expect(pipe.transform(emails, 'aa', false)).toEqual(expectedEmails);
  });
});
