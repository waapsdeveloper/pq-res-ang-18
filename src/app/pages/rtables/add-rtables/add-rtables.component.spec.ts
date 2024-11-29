import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRtablesComponent } from './add-rtables.component';

describe('AddRtablesComponent', () => {
  let component: AddRtablesComponent;
  let fixture: ComponentFixture<AddRtablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRtablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRtablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
