import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserRestaurantListComponent } from './add-user-restaurant-list.component';

describe('AddUserRestaurantListComponent', () => {
  let component: AddUserRestaurantListComponent;
  let fixture: ComponentFixture<AddUserRestaurantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserRestaurantListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserRestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
