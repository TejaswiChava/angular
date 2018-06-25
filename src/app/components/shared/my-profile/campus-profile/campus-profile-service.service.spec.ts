import { TestBed, inject } from '@angular/core/testing';

import { CampusProfileServiceService } from './campus-profile-service.service';

describe('CampusProfileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusProfileServiceService]
    });
  });

  it('should be created', inject([CampusProfileServiceService], (service: CampusProfileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
