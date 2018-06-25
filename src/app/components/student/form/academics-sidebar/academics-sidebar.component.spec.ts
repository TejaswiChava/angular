import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsSidebarComponent } from './academics-sidebar.component';

describe('AcademicsSidebarComponent', () => {
  let component: AcademicsSidebarComponent;
  let fixture: ComponentFixture<AcademicsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
