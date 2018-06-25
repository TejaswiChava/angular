import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHomeDashboardComponent } from './company-home-dashboard.component';

describe('CompanyHomeDashboardComponent', () => {
  let component: CompanyHomeDashboardComponent;
  let fixture: ComponentFixture<CompanyHomeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHomeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
