import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivenessGraphComponent } from './effectiveness-graph.component';

describe('EffectivenessGraphComponent', () => {
  let component: EffectivenessGraphComponent;
  let fixture: ComponentFixture<EffectivenessGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectivenessGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivenessGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
