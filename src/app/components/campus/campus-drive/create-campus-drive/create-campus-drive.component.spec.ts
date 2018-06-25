import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampusDriveComponent } from './create-campus-drive.component';

describe('CreateCampusDriveComponent', () => {
  let component: CreateCampusDriveComponent;
  let fixture: ComponentFixture<CreateCampusDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampusDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampusDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
