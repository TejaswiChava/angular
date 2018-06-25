import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusListSearchComponent } from './campus-list-search.component';

describe('CampusListSearchComponent', () => {
  let component: CampusListSearchComponent;
  let fixture: ComponentFixture<CampusListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
