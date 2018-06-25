import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgSalaryComponent } from './avg-salary.component';

describe('AvgSalaryComponent', () => {
  let component: AvgSalaryComponent;
  let fixture: ComponentFixture<AvgSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
