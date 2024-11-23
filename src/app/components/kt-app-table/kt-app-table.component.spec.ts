import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAppTableComponent } from './kt-app-table.component';

describe('KtAppTableComponent', () => {
  let component: KtAppTableComponent;
  let fixture: ComponentFixture<KtAppTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtAppTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtAppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
