import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedCampusListComponent } from './checked-campus-list.component';

describe('CheckedCampusListComponent', () => {
  let component: CheckedCampusListComponent;
  let fixture: ComponentFixture<CheckedCampusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckedCampusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedCampusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
