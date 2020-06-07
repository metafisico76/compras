import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialchartComponent } from './financialchart.component';

describe('FinancialchartComponent', () => {
  let component: FinancialchartComponent;
  let fixture: ComponentFixture<FinancialchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
