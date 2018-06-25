import { TestBed, inject } from '@angular/core/testing';

import { ScoraLandingService } from './scora-landing.service';

describe('ScoraLandingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoraLandingService]
    });
  });

  it('should be created', inject([ScoraLandingService], (service: ScoraLandingService) => {
    expect(service).toBeTruthy();
  }));
});
