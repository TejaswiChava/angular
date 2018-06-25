import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoraXchangeHomeComponent } from './scora-xchange-home.component';

describe('ScoraXchangeHomeComponent', () => {
  let component: ScoraXchangeHomeComponent;
  let fixture: ComponentFixture<ScoraXchangeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoraXchangeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoraXchangeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
