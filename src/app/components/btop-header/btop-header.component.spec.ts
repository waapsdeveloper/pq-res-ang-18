import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtopHeaderComponent } from './btop-header.component';

describe('BtopHeaderComponent', () => {
  let component: BtopHeaderComponent;
  let fixture: ComponentFixture<BtopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtopHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
