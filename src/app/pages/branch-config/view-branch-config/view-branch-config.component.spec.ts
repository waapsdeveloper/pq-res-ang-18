import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBranchConfigComponent } from './view-branch-config.component';

describe('ViewBranchConfigComponent', () => {
  let component: ViewBranchConfigComponent;
  let fixture: ComponentFixture<ViewBranchConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBranchConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBranchConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
