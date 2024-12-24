import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexSalesChartComponent } from './apex-sales-chart.component';

describe('ApexSalesChartComponent', () => {
  let component: ApexSalesChartComponent;
  let fixture: ComponentFixture<ApexSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApexSalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
