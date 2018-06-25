import { TestBed, inject } from '@angular/core/testing';

import { CampusListService } from './campus-list.service';

describe('CampusListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusListService]
    });
  });

  it('should be created', inject([CampusListService], (service: CampusListService) => {
    expect(service).toBeTruthy();
  }));
});
