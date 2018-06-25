import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusListListComponent } from './campus-list-list.component';

describe('CampusListListComponent', () => {
  let component: CampusListListComponent;
  let fixture: ComponentFixture<CampusListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
