import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAppToolbarBreadcrumbComponent } from './kt-app-toolbar-breadcrumb.component';

describe('KtAppToolbarBreadcrumbComponent', () => {
  let component: KtAppToolbarBreadcrumbComponent;
  let fixture: ComponentFixture<KtAppToolbarBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtAppToolbarBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtAppToolbarBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
