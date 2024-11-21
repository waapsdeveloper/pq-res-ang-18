import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantComponent } from './view-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRestaurantComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadChildren: () => import('./restaurant-overview/restaurant-overview.module').then((m) => m.RestaurantOverviewModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./restaurant-menu/restaurant-menu.module').then((m) => m.RestaurantMenuModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRestaurantRoutingModule { }
