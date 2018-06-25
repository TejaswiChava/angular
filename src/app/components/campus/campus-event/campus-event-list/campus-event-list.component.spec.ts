import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusEventListComponent } from './campus-event-list.component';

describe('CampusEventListComponent', () => {
  let component: CampusEventListComponent;
  let fixture: ComponentFixture<CampusEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
