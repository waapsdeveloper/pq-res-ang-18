import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableBookingComponent } from './add-table-booking.component';

describe('AddTableBookingComponent', () => {
  let component: AddTableBookingComponent;
  let fixture: ComponentFixture<AddTableBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTableBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTableBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
