import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAppTableSearchComponent } from './kt-app-table-search.component';

describe('KtAppTableSearchComponent', () => {
  let component: KtAppTableSearchComponent;
  let fixture: ComponentFixture<KtAppTableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtAppTableSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtAppTableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
