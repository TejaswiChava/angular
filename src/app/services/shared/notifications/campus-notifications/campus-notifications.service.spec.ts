import { TestBed, inject } from '@angular/core/testing';

import { CampusNotificationsService } from './campus-notifications.service';

describe('CampusNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampusNotificationsService]
    });
  });

  it('should be created', inject([CampusNotificationsService], (service: CampusNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
