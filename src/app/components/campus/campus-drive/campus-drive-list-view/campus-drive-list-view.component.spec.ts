import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusDriveListViewComponent } from './campus-drive-list-view.component';

describe('CampusDriveListViewComponent', () => {
  let component: CampusDriveListViewComponent;
  let fixture: ComponentFixture<CampusDriveListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusDriveListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusDriveListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
