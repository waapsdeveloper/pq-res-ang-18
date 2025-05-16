import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpenseStatusComponent } from './list-expense-status.component';

describe('ListExpenseStatusComponent', () => {
  let component: ListExpenseStatusComponent;
  let fixture: ComponentFixture<ListExpenseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListExpenseStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExpenseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
