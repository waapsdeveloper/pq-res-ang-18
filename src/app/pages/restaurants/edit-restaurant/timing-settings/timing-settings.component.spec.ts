import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimingSettingsComponent } from './timing-settings.component';

describe('TimingSettingsComponent', () => {
  let component: TimingSettingsComponent;
  let fixture: ComponentFixture<TimingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimingSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
