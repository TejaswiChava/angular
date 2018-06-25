import { TestBed, inject } from '@angular/core/testing';

import { SharedDriveService } from './shared-drive.service';

describe('SharedDriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedDriveService]
    });
  });

  it('should be created', inject([SharedDriveService], (service: SharedDriveService) => {
    expect(service).toBeTruthy();
  }));
});
