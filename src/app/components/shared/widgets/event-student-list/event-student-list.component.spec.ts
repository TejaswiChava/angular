import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStudentListComponent } from './event-student-list.component';

describe('EventStudentListComponent', () => {
  let component: EventStudentListComponent;
  let fixture: ComponentFixture<EventStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
