import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtListDetailPageComponent } from './kt-list-detail-page.component';

describe('KtListDetailPageComponent', () => {
  let component: KtListDetailPageComponent;
  let fixture: ComponentFixture<KtListDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtListDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtListDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
