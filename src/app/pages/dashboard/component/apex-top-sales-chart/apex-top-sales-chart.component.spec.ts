import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexTopSalesChartComponent } from './apex-top-sales-chart.component';

describe('ApexTopSalesChartComponent', () => {
  let component: ApexTopSalesChartComponent;
  let fixture: ComponentFixture<ApexTopSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApexTopSalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexTopSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
