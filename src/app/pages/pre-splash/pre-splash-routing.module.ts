import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSplashComponent } from './pre-splash.component';

const routes: Routes = [
  {
    path: '',
    component: PreSplashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSplashRoutingModule { }
