import { TestBed, inject } from '@angular/core/testing';

import { UiAttachmentsService } from './ui-attachments.service';

describe('UiAttachmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiAttachmentsService]
    });
  });

  it('should be created', inject([UiAttachmentsService], (service: UiAttachmentsService) => {
    expect(service).toBeTruthy();
  }));
});
