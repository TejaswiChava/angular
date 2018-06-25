import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnattendedStudentComponent } from './unattended-student.component';

describe('UnattendedStudentComponent', () => {
  let component: UnattendedStudentComponent;
  let fixture: ComponentFixture<UnattendedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnattendedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnattendedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
