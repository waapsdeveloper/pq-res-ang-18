import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpenseImageComponent } from './list-expense-image.component';

describe('ListExpenseImageComponent', () => {
  let component: ListExpenseImageComponent;
  let fixture: ComponentFixture<ListExpenseImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListExpenseImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExpenseImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
