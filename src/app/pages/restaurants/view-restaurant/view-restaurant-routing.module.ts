import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantComponent } from './view-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRestaurantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRestaurantRoutingModule { }
