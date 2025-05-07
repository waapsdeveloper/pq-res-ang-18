import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBranchConfigComponent } from './list-branch-config.component';

describe('ListBranchConfigComponent', () => {
  let component: ListBranchConfigComponent;
  let fixture: ComponentFixture<ListBranchConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBranchConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBranchConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
