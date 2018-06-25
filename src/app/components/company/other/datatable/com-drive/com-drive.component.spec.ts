import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComDriveComponent } from './com-drive.component';

describe('ComDriveComponent', () => {
  let component: ComDriveComponent;
  let fixture: ComponentFixture<ComDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
