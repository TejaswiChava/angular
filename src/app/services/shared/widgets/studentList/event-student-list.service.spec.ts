import { TestBed, inject } from '@angular/core/testing';

import { EventStudentListService } from './event-student-list.service';

describe('EventStudentListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventStudentListService]
    });
  });

  it('should be created', inject([EventStudentListService], (service: EventStudentListService) => {
    expect(service).toBeTruthy();
  }));
});
