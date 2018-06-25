import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoratechLandingPageComponent } from './scoratech-landing-page.component';

describe('ScoratechLandingPageComponent', () => {
  let component: ScoratechLandingPageComponent;
  let fixture: ComponentFixture<ScoratechLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoratechLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoratechLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
