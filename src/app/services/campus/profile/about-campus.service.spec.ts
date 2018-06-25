import { TestBed, inject } from '@angular/core/testing';

import { AboutCampusService } from './about-campus.service';

describe('AboutCampusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutCampusService]
    });
  });

  it('should be created', inject([AboutCampusService], (service: AboutCampusService) => {
    expect(service).toBeTruthy();
  }));
});
