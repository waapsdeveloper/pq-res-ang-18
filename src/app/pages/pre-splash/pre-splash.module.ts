import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSplashRoutingModule } from './pre-splash-routing.module';
import { PreSplashComponent } from './pre-splash.component';


@NgModule({
  declarations: [
    PreSplashComponent
  ],
  imports: [
    CommonModule,
    PreSplashRoutingModule
  ]
})
export class PreSplashModule { }
