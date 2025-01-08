import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVariationsComponent } from './view-variations.component';

describe('ViewVariationsComponent', () => {
  let component: ViewVariationsComponent;
  let fixture: ComponentFixture<ViewVariationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVariationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
