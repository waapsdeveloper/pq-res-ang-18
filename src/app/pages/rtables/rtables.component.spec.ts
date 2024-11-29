import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtablesComponent } from './rtables.component';

describe('RtablesComponent', () => {
  let component: RtablesComponent;
  let fixture: ComponentFixture<RtablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RtablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
