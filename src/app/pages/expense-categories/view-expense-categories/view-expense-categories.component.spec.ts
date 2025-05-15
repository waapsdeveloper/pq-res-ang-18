import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenseCategoriesComponent } from './view-expense-categories.component';

describe('ViewExpenseCategoriesComponent', () => {
  let component: ViewExpenseCategoriesComponent;
  let fixture: ComponentFixture<ViewExpenseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewExpenseCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpenseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
