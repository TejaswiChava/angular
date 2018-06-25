import { TestBed, inject } from '@angular/core/testing';

import { CampusUploadDocService } from './campus-upload-doc.service';

describe('CampusUploadDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('should be created', inject([CampusUploadDocService], (service: CampusUploadDocService) => {
    expect(service).toBeTruthy();
  }));
});
