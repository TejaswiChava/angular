import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCampusListComponent } from './selected-campus-list.component';

describe('SelectedCampusListComponent', () => {
  let component: SelectedCampusListComponent;
  let fixture: ComponentFixture<SelectedCampusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCampusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCampusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
