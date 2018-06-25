import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusPlacementComponent } from './campus-placement.component';

describe('CampusPlacementComponent', () => {
  let component: CampusPlacementComponent;
  let fixture: ComponentFixture<CampusPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
