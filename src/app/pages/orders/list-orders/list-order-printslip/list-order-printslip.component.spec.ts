import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderPrintslipComponent } from './list-order-printslip.component';

describe('ListOrderPrintslipComponent', () => {
  let component: ListOrderPrintslipComponent;
  let fixture: ComponentFixture<ListOrderPrintslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrderPrintslipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderPrintslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
