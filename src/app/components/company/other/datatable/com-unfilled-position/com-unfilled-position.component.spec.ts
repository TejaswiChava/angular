import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComUnfilledPositionComponent } from './com-unfilled-position.component';

describe('ComUnfilledPositionComponent', () => {
  let component: ComUnfilledPositionComponent;
  let fixture: ComponentFixture<ComUnfilledPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComUnfilledPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComUnfilledPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
