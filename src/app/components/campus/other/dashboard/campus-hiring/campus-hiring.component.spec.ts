import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusHiringComponent } from './campus-hiring.component';

describe('CampusHiringComponent', () => {
  let component: CampusHiringComponent;
  let fixture: ComponentFixture<CampusHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
