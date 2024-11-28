import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAppFormPageComponent } from './kt-app-form-page.component';

describe('KtAppFormPageComponent', () => {
  let component: KtAppFormPageComponent;
  let fixture: ComponentFixture<KtAppFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtAppFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtAppFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
