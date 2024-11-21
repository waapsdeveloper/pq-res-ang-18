import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTypeheadComponent } from './category-typehead.component';

describe('CategoryTypeheadComponent', () => {
  let component: CategoryTypeheadComponent;
  let fixture: ComponentFixture<CategoryTypeheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryTypeheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTypeheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
