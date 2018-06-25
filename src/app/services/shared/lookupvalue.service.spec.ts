import { TestBed, inject } from '@angular/core/testing';

import { LookupvalueService } from './lookupvalue.service';

describe('LookupvalueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupvalueService]
    });
  });

  it('should be created', inject([LookupvalueService], (service: LookupvalueService) => {
    expect(service).toBeTruthy();
  }));
});
