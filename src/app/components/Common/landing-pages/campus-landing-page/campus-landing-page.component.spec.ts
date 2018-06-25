import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusLandingPageComponent } from './campus-landing-page.component';

describe('CampusLandingPageComponent', () => {
  let component: CampusLandingPageComponent;
  let fixture: ComponentFixture<CampusLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
