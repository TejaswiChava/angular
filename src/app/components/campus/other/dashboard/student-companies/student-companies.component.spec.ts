import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompaniesComponent } from './student-companies.component';

describe('StudentCompaniesComponent', () => {
  let component: StudentCompaniesComponent;
  let fixture: ComponentFixture<StudentCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
