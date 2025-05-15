import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpenseCategoriesComponent } from './list-expense-categories.component';

describe('ListExpenseCategoriesComponent', () => {
  let component: ListExpenseCategoriesComponent;
  let fixture: ComponentFixture<ListExpenseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListExpenseCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExpenseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
