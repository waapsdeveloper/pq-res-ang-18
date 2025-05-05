import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderPaymentStatusComponent } from './list-order-payment-status.component';

describe('ListOrderPaymentStatusComponent', () => {
  let component: ListOrderPaymentStatusComponent;
  let fixture: ComponentFixture<ListOrderPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrderPaymentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
