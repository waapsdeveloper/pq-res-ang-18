import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableBookingStatusComponent } from './list-table-booking-status.component';

describe('ListTableBookingStatusComponent', () => {
  let component: ListTableBookingStatusComponent;
  let fixture: ComponentFixture<ListTableBookingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTableBookingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTableBookingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
