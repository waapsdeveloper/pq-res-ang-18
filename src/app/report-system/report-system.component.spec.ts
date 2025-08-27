import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSystemComponent } from './report-system.component';

describe('ReportSystemComponent', () => {
  let component: ReportSystemComponent;
  let fixture: ComponentFixture<ReportSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
