import { TestBed, inject } from '@angular/core/testing';

import { ScoraEnrollService } from './scora-enroll.service';

describe('ScoraEnrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoraEnrollService]
    });
  });

  it('should be created', inject([ScoraEnrollService], (service: ScoraEnrollService) => {
    expect(service).toBeTruthy();
  }));
});
