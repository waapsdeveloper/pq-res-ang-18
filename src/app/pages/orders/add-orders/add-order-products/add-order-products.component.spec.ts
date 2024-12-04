import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderProductsComponent } from './add-order-products.component';

describe('AddOrderProductsComponent', () => {
  let component: AddOrderProductsComponent;
  let fixture: ComponentFixture<AddOrderProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrderProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
