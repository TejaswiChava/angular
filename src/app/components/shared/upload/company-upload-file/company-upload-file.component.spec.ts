import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUploadFileComponent } from './company-upload-file.component';

describe('CompanyUploadFileComponent', () => {
  let component: CompanyUploadFileComponent;
  let fixture: ComponentFixture<CompanyUploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
