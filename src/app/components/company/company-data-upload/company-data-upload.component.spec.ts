import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataUploadComponent } from './company-data-upload.component';

describe('CompanyDataUploadComponent', () => {
  let component: CompanyDataUploadComponent;
  let fixture: ComponentFixture<CompanyDataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
