import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVariationsComponent } from './list-variations.component';

describe('ListVariationsComponent', () => {
  let component: ListVariationsComponent;
  let fixture: ComponentFixture<ListVariationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListVariationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
