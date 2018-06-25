import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLandingPageComponent } from './company-landing-page.component';

describe('CompanyLandingPageComponent', () => {
  let component: CompanyLandingPageComponent;
  let fixture: ComponentFixture<CompanyLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
