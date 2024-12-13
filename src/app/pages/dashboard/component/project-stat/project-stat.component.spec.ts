import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatComponent } from './project-stat.component';

describe('ProjectStatComponent', () => {
  let component: ProjectStatComponent;
  let fixture: ComponentFixture<ProjectStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
