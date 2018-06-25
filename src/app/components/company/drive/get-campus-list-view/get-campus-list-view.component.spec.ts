import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCampusListViewComponent } from './get-campus-list-view.component';

describe('GetCampusListViewComponent', () => {
  let component: GetCampusListViewComponent;
  let fixture: ComponentFixture<GetCampusListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCampusListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCampusListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
