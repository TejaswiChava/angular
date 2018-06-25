import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoraEnrollCampusComponent } from './scora-enroll-campus.component';

describe('ScoraEnrollCampusComponent', () => {
  let component: ScoraEnrollCampusComponent;
  let fixture: ComponentFixture<ScoraEnrollCampusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoraEnrollCampusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoraEnrollCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
