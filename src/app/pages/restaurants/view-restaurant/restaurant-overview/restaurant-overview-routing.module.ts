import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantOverviewComponent } from './restaurant-overview.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantOverviewRoutingModule { }
