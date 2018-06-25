import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusStudentListComponent } from './campus-student-list.component';

describe('CampusStudentListComponent', () => {
  let component: CampusStudentListComponent;
  let fixture: ComponentFixture<CampusStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
