import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGraphComponent } from './student-graph.component';

describe('StudentGraphComponent', () => {
  let component: StudentGraphComponent;
  let fixture: ComponentFixture<StudentGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
