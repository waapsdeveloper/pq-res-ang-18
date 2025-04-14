import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderTableComponent } from './add-order-table.component';

describe('AddOrderTableComponent', () => {
  let component: AddOrderTableComponent;
  let fixture: ComponentFixture<AddOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrderTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
