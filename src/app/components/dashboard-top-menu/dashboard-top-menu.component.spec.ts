import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopMenuComponent } from './dashboard-top-menu.component';

describe('DashboardTopMenuComponent', () => {
  let component: DashboardTopMenuComponent;
  let fixture: ComponentFixture<DashboardTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTopMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
