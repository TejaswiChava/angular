import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDispalyProfileComponent } from './company-dispaly-profile.component';

describe('CompanyDispalyProfileComponent', () => {
  let component: CompanyDispalyProfileComponent;
  let fixture: ComponentFixture<CompanyDispalyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDispalyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDispalyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
