import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettingsComponent } from './order-settings.component';

describe('OrderSettingsComponent', () => {
  let component: OrderSettingsComponent;
  let fixture: ComponentFixture<OrderSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
