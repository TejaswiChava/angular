import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCreateCampusEventComponent } from './actions-create-campus-event.component';

describe('ActionsCreateCampusEventComponent', () => {
  let component: ActionsCreateCampusEventComponent;
  let fixture: ComponentFixture<ActionsCreateCampusEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsCreateCampusEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsCreateCampusEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
