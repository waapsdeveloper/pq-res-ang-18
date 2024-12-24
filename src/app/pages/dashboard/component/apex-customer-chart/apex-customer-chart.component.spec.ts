import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexCustomerChartComponent } from './apex-customer-chart.component';

describe('ApexCustomerChartComponent', () => {
  let component: ApexCustomerChartComponent;
  let fixture: ComponentFixture<ApexCustomerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApexCustomerChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexCustomerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
