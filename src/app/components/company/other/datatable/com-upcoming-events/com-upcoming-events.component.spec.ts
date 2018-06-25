import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComUpcomingEventsComponent } from './com-upcoming-events.component';

describe('ComUpcomingEventsComponent', () => {
  let component: ComUpcomingEventsComponent;
  let fixture: ComponentFixture<ComUpcomingEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComUpcomingEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
