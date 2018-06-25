import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusUploadFileComponent } from './campus-upload-file.component';

describe('CampusUploadFileComponent', () => {
  let component: CampusUploadFileComponent;
  let fixture: ComponentFixture<CampusUploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusUploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
