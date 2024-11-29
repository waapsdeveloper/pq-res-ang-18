import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRtablesComponent } from './list-rtables.component';

describe('ListRtablesComponent', () => {
  let component: ListRtablesComponent;
  let fixture: ComponentFixture<ListRtablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRtablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRtablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
