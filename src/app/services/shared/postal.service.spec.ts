import { TestBed, inject } from '@angular/core/testing';

import { PostalService } from './postal.service';

describe('PostalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostalService]
    });
  });

  it('should be created', inject([PostalService], (service: PostalService) => {
    expect(service).toBeTruthy();
  }));
});
