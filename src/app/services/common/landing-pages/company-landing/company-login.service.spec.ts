import { TestBed, inject } from '@angular/core/testing';

import { CompanyLoginService } from './company-login.service';

describe('CompanyLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyLoginService]
    });
  });

  it('should be created', inject([CompanyLoginService], (service: CompanyLoginService) => {
    expect(service).toBeTruthy();
  }));
});
