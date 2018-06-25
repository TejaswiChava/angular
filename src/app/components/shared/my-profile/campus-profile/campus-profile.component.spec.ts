import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusProfileComponent } from './campus-profile.component';

describe('CampusProfileComponent', () => {
  let component: CampusProfileComponent;
  let fixture: ComponentFixture<CampusProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
