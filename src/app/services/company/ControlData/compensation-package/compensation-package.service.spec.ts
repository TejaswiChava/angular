import { TestBed, inject } from '@angular/core/testing';

import { CompensationPackageService } from './compensation-package.service';

describe('CompensationPackageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompensationPackageService]
    });
  });

  it('should be created', inject([CompensationPackageService], (service: CompensationPackageService) => {
    expect(service).toBeTruthy();
  }));
});
