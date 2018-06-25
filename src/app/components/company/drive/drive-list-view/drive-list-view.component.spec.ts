import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveListViewComponent } from './drive-list-view.component';

describe('DriveListViewComponent', () => {
  let component: DriveListViewComponent;
  let fixture: ComponentFixture<DriveListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
