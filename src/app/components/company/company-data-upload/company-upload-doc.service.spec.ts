import { TestBed, inject } from '@angular/core/testing';

import { CompanyUploadDocService } from './company-upload-doc.service';

describe('CompanyUploadDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyUploadDocService]
    });
  });

  it('should be created', inject([CompanyUploadDocService], (service: CompanyUploadDocService) => {
    expect(service).toBeTruthy();
  }));
});
