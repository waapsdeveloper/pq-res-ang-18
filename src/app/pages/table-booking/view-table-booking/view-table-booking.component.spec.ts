import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTableBookingComponent } from './view-table-booking.component';

describe('ViewTableBookingComponent', () => {
  let component: ViewTableBookingComponent;
  let fixture: ComponentFixture<ViewTableBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTableBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTableBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
