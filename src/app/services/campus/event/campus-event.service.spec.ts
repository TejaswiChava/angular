import { TestBed, inject } from '@angular/core/testing';

import { CampusEventService } from './campus-event.service';

describe('CampusEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusEventService]
    });
  });

  it('should be created', inject([CampusEventService], (service: CampusEventService) => {
    expect(service).toBeTruthy();
  }));
});
