import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPlacementsComponent } from './recent-placements.component';

describe('RecentPlacementsComponent', () => {
  let component: RecentPlacementsComponent;
  let fixture: ComponentFixture<RecentPlacementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPlacementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
