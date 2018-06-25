import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusHomeComponent } from './campus-home.component';

describe('CampusHomeComponent', () => {
  let component: CampusHomeComponent;
  let fixture: ComponentFixture<CampusHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
