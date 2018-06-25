import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationPackageComponent } from './compensation-package.component';

describe('CompensationPackageComponent', () => {
  let component: CompensationPackageComponent;
  let fixture: ComponentFixture<CompensationPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
