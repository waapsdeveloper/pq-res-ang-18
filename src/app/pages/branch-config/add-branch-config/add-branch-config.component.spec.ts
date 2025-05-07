import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchConfigComponent } from './add-branch-config.component';

describe('AddBranchConfigComponent', () => {
  let component: AddBranchConfigComponent;
  let fixture: ComponentFixture<AddBranchConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBranchConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBranchConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
