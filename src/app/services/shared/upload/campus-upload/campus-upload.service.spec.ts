import { TestBed, inject } from '@angular/core/testing';

import { CampusUploadService } from './campus-upload.service';

describe('CampusUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusUploadService]
    });
  });

  it('should be created', inject([CampusUploadService], (service: CampusUploadService) => {
    expect(service).toBeTruthy();
  }));
});
