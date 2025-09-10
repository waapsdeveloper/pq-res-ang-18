import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductStatusComponent } from './list-product-status.component';

describe('ListProductStatusComponent', () => {
  let component: ListProductStatusComponent;
  let fixture: ComponentFixture<ListProductStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProductStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
