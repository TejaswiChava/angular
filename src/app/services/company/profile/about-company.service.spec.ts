import { TestBed, inject } from '@angular/core/testing';

import { AboutCompanyService } from './about-company.service';

describe('AboutCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutCompanyService]
    });
  });

  it('should be created', inject([AboutCompanyService], (service: AboutCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
