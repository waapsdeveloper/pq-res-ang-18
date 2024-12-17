import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableBookingComponent } from './list-table-booking.component';

describe('ListTableBookingComponent', () => {
  let component: ListTableBookingComponent;
  let fixture: ComponentFixture<ListTableBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTableBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTableBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
