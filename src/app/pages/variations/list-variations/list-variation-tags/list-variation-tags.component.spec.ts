import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVariationTagsComponent } from './list-variation-tags.component';

describe('ListVariationTagsComponent', () => {
  let component: ListVariationTagsComponent;
  let fixture: ComponentFixture<ListVariationTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListVariationTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVariationTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
