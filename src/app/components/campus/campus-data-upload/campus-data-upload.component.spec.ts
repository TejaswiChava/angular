import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusDataUploadComponent } from './campus-data-upload.component';

describe('CampusDataUploadComponent', () => {
  let component: CampusDataUploadComponent;
  let fixture: ComponentFixture<CampusDataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusDataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
