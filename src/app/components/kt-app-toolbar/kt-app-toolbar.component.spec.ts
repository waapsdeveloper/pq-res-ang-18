import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAppToolbarComponent } from './kt-app-toolbar.component';

describe('KtAppToolbarComponent', () => {
  let component: KtAppToolbarComponent;
  let fixture: ComponentFixture<KtAppToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtAppToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtAppToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
