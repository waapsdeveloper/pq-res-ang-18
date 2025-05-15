import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenseCategoriesComponent } from './edit-expense-categories.component';

describe('EditExpenseCategoriesComponent', () => {
  let component: EditExpenseCategoriesComponent;
  let fixture: ComponentFixture<EditExpenseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExpenseCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpenseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
