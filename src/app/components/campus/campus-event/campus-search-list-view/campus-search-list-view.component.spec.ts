import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusSearchListViewComponent } from './campus-search-list-view.component';

describe('CampusSearchListViewComponent', () => {
  let component: CampusSearchListViewComponent;
  let fixture: ComponentFixture<CampusSearchListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusSearchListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusSearchListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
