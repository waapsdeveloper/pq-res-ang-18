import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-restaurant/list-restaurant.module').then((m) => m.ListRestaurantModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-restaurant/add-restaurant.module').then((m) => m.AddRestaurantModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
