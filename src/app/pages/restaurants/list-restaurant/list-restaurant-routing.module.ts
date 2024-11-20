import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRestaurantComponent } from './list-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: ListRestaurantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRestaurantRoutingModule { }
