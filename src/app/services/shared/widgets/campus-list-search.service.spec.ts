import { TestBed, inject } from '@angular/core/testing';

import { CampusListSearchService } from './campus-list-search.service';

describe('CampusListSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusListSearchService]
    });
  });

  it('should be created', inject([CampusListSearchService], (service: CampusListSearchService) => {
    expect(service).toBeTruthy();
  }));
});
