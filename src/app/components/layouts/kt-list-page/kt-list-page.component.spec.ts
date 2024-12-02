import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtListPageComponent } from './kt-list-page.component';

describe('KtListPageComponent', () => {
  let component: KtListPageComponent;
  let fixture: ComponentFixture<KtListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
