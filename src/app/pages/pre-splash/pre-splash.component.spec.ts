import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSplashComponent } from './pre-splash.component';

describe('PreSplashComponent', () => {
  let component: PreSplashComponent;
  let fixture: ComponentFixture<PreSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreSplashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
