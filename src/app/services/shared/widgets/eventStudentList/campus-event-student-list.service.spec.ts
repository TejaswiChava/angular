import { TestBed, inject } from '@angular/core/testing';

import { CampusEventStudentListService } from './campus-event-student-list.service';

describe('CampusEventStudentListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusEventStudentListService]
    });
  });

  it('should be created', inject([CampusEventStudentListService], (service: CampusEventStudentListService) => {
    expect(service).toBeTruthy();
  }));
});
