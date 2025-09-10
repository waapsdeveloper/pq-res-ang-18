import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryStatusComponent } from './list-category-status.component';

describe('ListCategoryStatusComponent', () => {
  let component: ListCategoryStatusComponent;
  let fixture: ComponentFixture<ListCategoryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCategoryStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
