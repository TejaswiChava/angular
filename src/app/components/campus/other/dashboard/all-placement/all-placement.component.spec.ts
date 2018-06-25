import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlacementComponent } from './all-placement.component';

describe('AllPlacementComponent', () => {
  let component: AllPlacementComponent;
  let fixture: ComponentFixture<AllPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
