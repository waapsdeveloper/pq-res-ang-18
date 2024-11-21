import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeheadComponent } from './product-typehead.component';

describe('ProductTypeheadComponent', () => {
  let component: ProductTypeheadComponent;
  let fixture: ComponentFixture<ProductTypeheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTypeheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTypeheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
