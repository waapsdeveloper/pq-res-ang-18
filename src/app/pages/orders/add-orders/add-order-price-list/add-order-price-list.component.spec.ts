import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderPriceListComponent } from './add-order-price-list.component';

describe('AddOrderPriceListComponent', () => {
  let component: AddOrderPriceListComponent;
  let fixture: ComponentFixture<AddOrderPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrderPriceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
