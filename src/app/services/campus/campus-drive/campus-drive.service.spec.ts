import { TestBed, inject } from '@angular/core/testing';

import { CampusDriveService } from './campus-drive.service';

describe('CampusDriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusDriveService]
    });
  });

  it('should be created', inject([CampusDriveService], (service: CampusDriveService) => {
    expect(service).toBeTruthy();
  }));
});
