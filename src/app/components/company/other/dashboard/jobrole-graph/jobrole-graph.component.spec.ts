import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobroleGraphComponent } from './jobrole-graph.component';

describe('JobroleGraphComponent', () => {
  let component: JobroleGraphComponent;
  let fixture: ComponentFixture<JobroleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobroleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobroleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
