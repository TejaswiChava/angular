import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComRecentPlacementsComponent } from './com-recent-placements.component';

describe('ComRecentPlacementsComponent', () => {
  let component: ComRecentPlacementsComponent;
  let fixture: ComponentFixture<ComRecentPlacementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComRecentPlacementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComRecentPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
