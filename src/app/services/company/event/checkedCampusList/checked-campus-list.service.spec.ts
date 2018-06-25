import { TestBed, inject } from '@angular/core/testing';

import { CheckedCampusListService } from './checked-campus-list.service';

describe('CheckedCampusListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckedCampusListService]
    });
  });

  it('should be created', inject([CheckedCampusListService], (service: CheckedCampusListService) => {
    expect(service).toBeTruthy();
  }));
});
