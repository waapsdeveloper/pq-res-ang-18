import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariationsComponent } from './edit-variations.component';

describe('EditVariationsComponent', () => {
  let component: EditVariationsComponent;
  let fixture: ComponentFixture<EditVariationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVariationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
