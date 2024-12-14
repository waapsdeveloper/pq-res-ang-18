import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteTableComponent } from './favourite-table.component';

describe('FavouriteTableComponent', () => {
  let component: FavouriteTableComponent;
  let fixture: ComponentFixture<FavouriteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
