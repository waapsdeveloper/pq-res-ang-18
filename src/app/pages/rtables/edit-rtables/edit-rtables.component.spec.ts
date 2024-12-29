import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRtablesComponent } from './edit-rtables.component';

describe('EditRtablesComponent', () => {
  let component: EditRtablesComponent;
  let fixture: ComponentFixture<EditRtablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRtablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRtablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
