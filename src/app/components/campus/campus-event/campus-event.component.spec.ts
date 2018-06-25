import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusEventComponent } from './campus-event.component';

describe('CampusEventComponent', () => {
  let component: CampusEventComponent;
  let fixture: ComponentFixture<CampusEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
