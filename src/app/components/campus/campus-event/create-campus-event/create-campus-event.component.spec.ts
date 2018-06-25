import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampusEventComponent } from './create-campus-event.component';

describe('CreateCampusEventComponent', () => {
  let component: CreateCampusEventComponent;
  let fixture: ComponentFixture<CreateCampusEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampusEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampusEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
