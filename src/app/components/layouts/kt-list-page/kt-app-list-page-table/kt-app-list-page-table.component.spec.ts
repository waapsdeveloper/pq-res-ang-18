import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAppListPageTableComponent } from './kt-app-list-page-table.component';

describe('KtAppListPageTableComponent', () => {
  let component: KtAppListPageTableComponent;
  let fixture: ComponentFixture<KtAppListPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KtAppListPageTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtAppListPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
