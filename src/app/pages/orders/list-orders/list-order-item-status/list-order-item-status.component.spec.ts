import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderItemStatusComponent } from './list-order-item-status.component';

describe('ListOrderItemStatusComponent', () => {
  let component: ListOrderItemStatusComponent;
  let fixture: ComponentFixture<ListOrderItemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrderItemStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
