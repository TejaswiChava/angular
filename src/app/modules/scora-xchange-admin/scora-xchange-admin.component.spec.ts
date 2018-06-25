import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoraXchangeAdminComponent } from './scora-xchange-admin.component';

describe('ScoraXchangeAdminComponent', () => {
  let component: ScoraXchangeAdminComponent;
  let fixture: ComponentFixture<ScoraXchangeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoraXchangeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoraXchangeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
