import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampusListComponent } from './create-campus-list.component';

describe('CreateCampusListComponent', () => {
  let component: CreateCampusListComponent;
  let fixture: ComponentFixture<CreateCampusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
