import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLandingPageComponent } from './student-landing-page.component';

describe('StudentLandingPageComponent', () => {
  let component: StudentLandingPageComponent;
  let fixture: ComponentFixture<StudentLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
