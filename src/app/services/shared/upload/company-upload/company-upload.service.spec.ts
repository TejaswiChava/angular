import { TestBed, inject } from '@angular/core/testing';

import { CompanyUploadService } from './company-upload.service';

describe('CompanyUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyUploadService]
    });
  });

  it('should be created', inject([CompanyUploadService], (service: CompanyUploadService) => {
    expect(service).toBeTruthy();
  }));
});
