import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStudentManagementComponent } from './event-student-management.component';

describe('EventStudentManagementComponent', () => {
  let component: EventStudentManagementComponent;
  let fixture: ComponentFixture<EventStudentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStudentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStudentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
