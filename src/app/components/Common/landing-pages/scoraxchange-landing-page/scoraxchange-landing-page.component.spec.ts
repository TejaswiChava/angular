import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoraxchangeHomePageComponent } from './scoraxchange-landing-page.component';

describe('ScoraxchangeHomePageComponent', () => {
  let component: ScoraxchangeHomePageComponent;
  let fixture: ComponentFixture<ScoraxchangeHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoraxchangeHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoraxchangeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
