import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardSummaryComponent } from './company-dashboard-summary.component';

describe('CompanyDashboardSummaryComponent', () => {
  let component: CompanyDashboardSummaryComponent;
  let fixture: ComponentFixture<CompanyDashboardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDashboardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDashboardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
