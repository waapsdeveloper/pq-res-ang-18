import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderCategoriesComponent } from './add-order-categories.component';

describe('AddOrderCategoriesComponent', () => {
  let component: AddOrderCategoriesComponent;
  let fixture: ComponentFixture<AddOrderCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrderCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
