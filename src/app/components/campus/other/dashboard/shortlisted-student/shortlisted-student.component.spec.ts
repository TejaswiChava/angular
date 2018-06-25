import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistedStudentComponent } from './shortlisted-student.component';

describe('ShortlistedStudentComponent', () => {
  let component: ShortlistedStudentComponent;
  let fixture: ComponentFixture<ShortlistedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
