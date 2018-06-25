import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardProfileComponent } from './company-dashboard-profile.component';

describe('CompanyDashboardProfileComponent', () => {
  let component: CompanyDashboardProfileComponent;
  let fixture: ComponentFixture<CompanyDashboardProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDashboardProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDashboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
