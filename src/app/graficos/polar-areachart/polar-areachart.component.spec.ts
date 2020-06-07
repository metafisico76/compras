import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarAreachartComponent } from './polar-areachart.component';

describe('PolarAreachartComponent', () => {
  let component: PolarAreachartComponent;
  let fixture: ComponentFixture<PolarAreachartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolarAreachartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarAreachartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
