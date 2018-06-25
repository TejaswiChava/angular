import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComEventCalenderComponent } from './com-event-calender.component';

describe('ComEventCalenderComponent', () => {
  let component: ComEventCalenderComponent;
  let fixture: ComponentFixture<ComEventCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComEventCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComEventCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
